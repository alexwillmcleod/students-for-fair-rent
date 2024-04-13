import { Router, Request, Response } from 'npm:express';
import { GameSession } from '../db/models/game.ts';

const gameRoutes = Router();

gameRoutes.post('/', async (_: Request, res: Response) => {
  try {
    const game = await new GameSession().save();
    return res.status(200).send({
      game: game._id,
    });
  } catch {
    return res.status(500).send();
  }
});

gameRoutes.patch('/', async (req: Request, res: Response) => {
  const {
    sessionId,
    isGameOver,
    numberOfWeeks,
    money,
    totalDebt,
    lossReason,
    grade,
  } = req.body;
  try {
    await GameSession.findOneAndUpdate(
      {
        _id: sessionId,
        isGameOver: false,
      },
      {
        isGameOver,
        numberOfWeeks,
        end: Date.now(),
        money,
        grade,
        totalDebt,
        lossReason,
      }
    );
    return res.status(200).send();
  } catch {
    return res.status(500).send();
  }
});

export default gameRoutes;
