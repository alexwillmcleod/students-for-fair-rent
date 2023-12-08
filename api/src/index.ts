// @deno-types="npm:@types/express"
import express, { Request, Response, Router, json } from 'npm:express';
import mongoose, { connect } from 'npm:mongoose';
import { User } from './db/models/user.ts';
import userRoutes from './routes/users.ts';
import { load } from 'https://deno.land/std@0.208.0/dotenv/mod.ts';

// Get environment variables from .env
// config();
const env = await load();

const app = express();
app.use(json());

// Connect to mongodb database
const databaseUrl: string = env['DATABASE_URL'];
await connect(databaseUrl);

const apiRouter = Router();
apiRouter.use('/user', userRoutes);

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
