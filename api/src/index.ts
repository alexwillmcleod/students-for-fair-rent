// @deno-types="npm:@types/express"
import express, { Request, Response, Router, json } from 'npm:express';
import mongoose, { connect } from 'npm:mongoose';
import strikeRoutes from './routes/strike.ts';
import gameRoutes from './routes/game.ts';
import statsRoutes from './routes/stats.ts';
import dashboardRoutes from './routes/dashboard.ts';
import 'https://deno.land/std@0.208.0/dotenv/load.ts';
import cors from 'npm:cors';

const app = express();
app.use(json());
app.use(cors());

// Connect to mongodb database
const databaseUrl: string = Deno.env.get('DATABASE_URL')!;
await connect(databaseUrl);

const apiRouter = Router();
apiRouter.use('/strike', strikeRoutes);
apiRouter.use('/stats', statsRoutes);
apiRouter.use('/dashboard', dashboardRoutes);
apiRouter.use('/game', gameRoutes);
app.use('/api', apiRouter);

const port = Number.parseInt(Deno.env.get('PORT') || '3000');
app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}`);
});
