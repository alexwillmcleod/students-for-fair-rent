// @deno-types="npm:@types/express"
import express, { Request, Response, Router, json } from 'npm:express';
import mongoose, { connect } from 'npm:mongoose@8.0.3';
import { User } from './db/models/user.ts';
import userRoutes from './routes/users.ts';
import authRoutes from './routes/auth.ts';
import strikeRoutes from './routes/strike.ts';
import statsRoutes from './routes/stats.ts';
import dashboardRoutes from './routes/dashboard.ts';
import 'https://deno.land/std@0.208.0/dotenv/load.ts';
import { maybeAuth } from './middleware/auth.ts';
import cors from 'npm:cors';

const app = express();
app.use(json());
app.use(cors());

// Connect to mongodb database
const databaseUrl: string = Deno.env.get('DATABASE_URL')!;
await connect(databaseUrl);

const apiRouter = Router();
apiRouter.use('/user', userRoutes);
apiRouter.use('/auth', authRoutes);
apiRouter.use('/strike', strikeRoutes);
apiRouter.use('/stats', statsRoutes);
apiRouter.use('/dashboard', dashboardRoutes);
apiRouter.get('/', maybeAuth, async (req, res) => {
  return res
    .status(200)
    .send(
      `Hello, ${req.body.user?.firstName ? req.body.user.firstName : 'friend'}`
    );
});

app.use('/api', apiRouter);

const port = Deno.env.get('PORT') || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
