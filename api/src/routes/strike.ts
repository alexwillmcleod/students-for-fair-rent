// @deno-types="npm:@types/express"
import { Router, Request, Response } from 'npm:express';
import { auth } from '../middleware/auth.ts';
import mongoose from 'npm:mongoose';
import { Strike } from '../db/models/strike.ts';

const ONE_WEEK = 604800000;
const strikeRoutes = Router();

const getOverlappingStrike = async (
  user: mongoose.Types.ObjectId,
  newEnd: Date = new Date()
) => {
  return await Strike.findOne({
    user,
    $or: [
      {
        // If end is after newEnd
        end: {
          $gt: newEnd,
        },
      },
      // or end does not exist (until further notice)
      {
        end: { $exists: false },
      },
    ],
    start: {
      $lt: new Date(),
    },
  });
};

strikeRoutes.get('/status', auth, async (req: Request, res: Response) => {
  try {
    const ongoingStrike = await getOverlappingStrike(req.body.user._id);
    return res.status(200).send(ongoingStrike != undefined);
  } catch (err) {
    console.error(err);
    return res.status(500).send('failed to get status');
  }
});

strikeRoutes.post('/create', auth, async (req: Request, res: Response) => {
  const { numberWeeks, why, isAnonymous } = req.body;

  let newEnd: Date | undefined = undefined;
  if (numberWeeks) {
    const duration = numberWeeks * ONE_WEEK;
    newEnd = new Date(new Date().getTime() + duration);
  }

  // Check if the new start is after every ending
  const ongoingStrike = await getOverlappingStrike(req.body.user._id, newEnd);

  if (ongoingStrike != null) {
    return res.status(400).send('cannot start strike during a strike');
  }

  try {
    await new Strike({
      user: req.body.user._id,
      start: Date.now(),
      end: newEnd,
      hallOfResidence: req.body.user.hallOfResidence,
      why,
    }).save();
  } catch (err) {
    console.error(err);
    return res.status(500).send('failed to add strike');
  }
  return res.status(200).send('created strike');
});

strikeRoutes.delete('/end', auth, async (req: Request, res: Response) => {
  try {
    const ongoingStrike = await getOverlappingStrike(req.body.user._id);

    console.log(ongoingStrike);
    if (ongoingStrike == null)
      return res.status(400).send('no strike is ongoing');
    ongoingStrike.end = new Date();
    ongoingStrike.save();
  } catch (err) {
    console.error(err);
    return res.status(500).send('failed to end strike');
  }
  return res.status(200).send('successfully ended strike');
});

strikeRoutes.post('/extend', auth, async (req: Request, res: Response) => {
  const { numberWeeks } = req.body;

  // Check if the new start is after every ending
  const ongoingStrike = await getOverlappingStrike(req.body.user._id);

  if (!ongoingStrike) {
    return res.status(400).send('no strike to extend');
  }

  if (!ongoingStrike.end) {
    return res.status(400).send('strike is already going on indefinitely');
  }

  ongoingStrike.end! = new Date(
    ongoingStrike.end.getTime() + ONE_WEEK * numberWeeks
  );
  try {
    ongoingStrike.save();
  } catch {
    return res.status(500).send('failed to extend strike');
  }

  return res.status(200).send('extended strike');
});

export default strikeRoutes;
