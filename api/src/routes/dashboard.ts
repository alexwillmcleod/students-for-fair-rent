// @deno-types="npm:@types/express"
import { Router, Request, Response } from 'npm:express';
import { Strike } from '../db/models/strike.ts';

const dashboardRoutes = Router();
const ONE_WEEK = 604800000;

dashboardRoutes.get('/', async (req: Request, res: Response) => {
  const pledges = await Promise.all(
    // Find concurrent
    (
      await Strike.find({
        isAnonymous: false,
        why: {
          $exists: true,
          $ne: '',
        },
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
        .filter.sort({ createdAt: -1 })
        .limit(50)
    ).map(async (element) => {
      const fullName =
        element.isAnonymous || !element.firstName
          ? 'Anonymous'
          : element.lastName
          ? element.firstName // Could also join with last name for full
          : element.firstName;
      const numberWeeks = undefined;
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
