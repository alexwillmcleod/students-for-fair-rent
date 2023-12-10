// @deno-types="npm:@types/express"
import express, { Request, Response, Router, json } from 'npm:express';
import mongoose, { connect } from 'npm:mongoose';
import { User } from './db/models/user.ts';
import userRoutes from './routes/users.ts';
import authRoutes from './routes/auth.ts';
import strikeRoutes from './routes/strike.ts';
import statsRoutes from './routes/stats.ts';
import { load } from 'https://deno.land/std@0.208.0/dotenv/mod.ts';
import { maybeAuth } from './middleware/auth.ts';
import cors from 'npm:cors';

// Get environment variables from .env
// config();
const env = await load();

const app = express();
app.use(json());
app.use(cors());

// Connect to mongodb database
const databaseUrl: string = env['DATABASE_URL'];
await connect(databaseUrl);

const apiRouter = Router();
apiRouter.use('/user', userRoutes);
apiRouter.use('/auth', authRoutes);
apiRouter.use('/strike', strikeRoutes);
apiRouter.use('/stats', statsRoutes);
apiRouter.get('/', maybeAuth, async (req, res) => {
  return res
    .status(200)
    .send(
      `Hello, ${req.body.user?.firstName ? req.body.user.firstName : 'friend'}`
    );
});

app.use('/api', apiRouter);

// await new User({
//   firstName: 'Doy',
//   lastName: 'Stoy',
//   emailAddress: 'doy@gmail.com',
//   upi: 'dsto145',
//   studentId: '507036952',
// }).save();

const port = env['PORT'] || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
