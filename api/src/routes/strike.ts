// @deno-types="npm:@types/express"
import { Router, Request, Response } from 'npm:express';
import { auth } from '../middleware/auth.ts';
import { Strike } from '../db/models/strike.ts';

const strikeRoutes = Router();

strikeRoutes.post('/create', auth, async (req: Request, res: Response) => {
  const { end, why } = req.body;

  // Check if the new start is after every ending
  const ongoingStrike = await Strike.findOne({
    user: req.body.user._id,
    $or: [
      {
        // If end is after newEnd
        end: {
          $gte: end,
        },
      },
      // or end does not exist (until further notice)
      {
        end: { $exists: false },
      },
    ],
  });
  if (ongoingStrike != null) {
    return res.status(400).send('cannot start strike during a strike');
  }

  try {
    await new Strike({
      user: req.body.user._id,
      start: Date.now(),
      end,
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
    const ongoingStrike = await Strike.findOneAndUpdate(
      {
        user: req.body.user._id,
        $or: [
          {
            // If end is after newEnd
            end: {
              $gte: Date.now(),
            },
          },
          // or end does not exist (until further notice)
          {
            end: { $exists: false },
          },
        ],
      },
      { end: Date.now() }
    );
    console.log(ongoingStrike);
    if (ongoingStrike == null)
      return res.status(400).send('no strike is ongoing');
  } catch (err) {
    console.error(err);
    return res.status(500).send('failed to end strike');
  }
  return res.status(200).send('successfully ended strike');
});

export default strikeRoutes;
