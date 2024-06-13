// @deno-types="npm:@types/express"
import { Router, Request, Response } from 'npm:express';
import { Strike } from '../db/models/strike.ts';
import { Stats } from '../db/models/stats.ts';

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
    case 'Te Tirohanga o te Tōangaroa': {
      return 320;
    }
    case 'Waipārūrū': {
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
    default: {
      // If this is broken just choose this random number
      return 450;
    }
  }
};

const updateCalculations = async () => {
  const totalStrikerCount = (await Strike.distinct('emailAddress')).length;
  if (totalStrikerCount == 0) {
    await new Stats({
      totalStrikerCount: 0,
      totalDollarCount: 0,
      concurrentStrikerCount: 0,
    });
    return;
  }
  // const concurrentStrikerCount = (
  //   await Strike.distinct('emailAddress', {
  //     $or: [
  //       {
  //         end: {
  //           $gt: Date.now(),
  //         },
  //       },
  //       { end: { $exists: false } },
  //     ],
  //     start: {
  //       $lt: Date.now(),
  //     },
  //   })
  // ).length;
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
  await new Stats({
    totalStrikerCount,
    totalDollarCount,
    concurrentStrikerCount: totalStrikerCount,
  }).save();
};

statsRoutes.get('/', async (req: Request, res: Response) => {
  let mostRecentStat = await Stats.findOne({}).sort({
    calculatedAt: -1,
  });

  if (mostRecentStat) {
    // Create a new Date object for the current date and time
    const currentDate = new Date();

    // Create a new Date object for the date half a day ago
    const halfDayAgo = new Date();
    halfDayAgo.setDate(currentDate.getDate() - 0.5);

    const yourDate = mostRecentStat.calculatedAt;

    if (yourDate < halfDayAgo || yourDate > currentDate) {
      updateCalculations();
    }
    const concurrentStrikerCount = (
      await Strike.distinct('emailAddress', {
        $or: [
          {
            end: {
              $gt: Date.now(),
            },
          },
          { end: { $exists: false } },
        ],
        // start: {
        //   $lt: Date.now(),
        // },
      })
    ).length;

    mostRecentStat.concurrentStrikerCount = concurrentStrikerCount;
    return res.status(200).send(JSON.stringify(mostRecentStat));
  } else {
    updateCalculations();
    return res.status(200).send(
      JSON.stringify({
        totalStrikerCount: 0,
        totalDollarCount: 0,
        concurrentStrikerCount: 0,
      })
    );
  }
});

export default statsRoutes;
