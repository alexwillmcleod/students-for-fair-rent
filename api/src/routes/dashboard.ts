// @deno-types="npm:@types/express"
import { Router, Request, Response } from 'npm:express';
import { Strike } from '../db/models/strike.ts';
import { User } from '../db/models/user.ts';

const dashboardRoutes = Router();
const ONE_WEEK = 604800000;

dashboardRoutes.get('/', async (req: Request, res: Response) => {
  const pledges = await Promise.all(
    // Find concurrent
    (
      await Strike.find({
        $or: [
          {
            end: {
              $gt: Date.now(),
            },
          },
          { end: { $exists: false } },
        ],
        start: {
          $lt: Date.now(),
        },
      })
    ).map(async (element) => {
      const user = await User.findById(element.user);
      const fullName =
        element.isAnonymous || !user || !user.firstName
          ? 'Anonymous'
          : [user.firstName, user.lastName].join(' ');
      const numberWeeks = element.end
        ? Math.round(
            (element.end.getTime() - element.start.getTime()) / ONE_WEEK
          )
        : undefined;
      return {
        why: element.why,
        numberWeeks,
        fullName,
      };
    })
  );
  return res.status(200).send(pledges);
});

export default dashboardRoutes;
