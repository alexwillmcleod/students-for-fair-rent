// @deno-types="npm:@types/express"
import { Router, Request, Response } from 'npm:express';
import { User } from '../db/models/user.ts';
import { Strike } from '../db/models/strike.ts';

const ONE_WEEK = 604800000;
const statsRoutes = Router();

interface Stats {
  concurrentStrikerCount: number;
  totalStrikerCount: number;
  totalDollarCount: number;
}

const getWeeklyRent = (hall: any) => {
  switch (hall) {
    case 'Carlaw Park Stuart McCutcheon House': {
      return 355;
    }
    case 'Carlaw Park Nicholls': {
      return 345;
    }
    case '55 Symonds': {
      return 450;
    }
    case 'Te Tirohanga o te Toangaroa': {
      return 320;
    }
    case 'Waiparuru': {
      return 510;
    }
    case 'Grafton': {
      return 490;
    }
    case 'University Hall Towers': {
      return 490;
    }
    case "O'Rorke": {
      return 470;
    }
  }
};

const getTotalCost = statsRoutes.get(
  '/',
  async (req: Request, res: Response) => {
    const totalStrikerCount = (await Strike.distinct('user')).length;
    const concurrentStrikerCount = (
      await Strike.distinct('user', {
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
    ).length;
    const totalDollarCount = Math.round(
      (await Strike.find())
        .map((element) => {
          let compDate = Date.now();
          if (element.end && element.end.getTime() < compDate) {
            compDate = element.end.getTime();
          }
          const numberOfMilliseconds = compDate - element.start.getTime();
          const numberOfWeeks = numberOfMilliseconds / ONE_WEEK;
          const weeklyRent = getWeeklyRent(element.hallOfResidence) || 0;
          return weeklyRent * numberOfWeeks;
        })
        .reduce((acc, x) => acc + x)
    );
    return res
      .status(200)
      .send({ totalStrikerCount, concurrentStrikerCount, totalDollarCount });
  }
);

export default statsRoutes;