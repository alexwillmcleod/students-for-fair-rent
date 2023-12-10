// @deno-types="npm:@types/express"
import { Router, Request, Response } from 'npm:express';
import { User } from '../db/models/user.ts';
import mongoose from 'npm:mongoose';

const ONE_WEEK = 604800000;
const userRoutes = Router();

userRoutes.post('/create', async (req: Request, res: Response) => {
  const { firstName, lastName, studentId, upi, emailAddress, hallOfResidence } =
    req.body;

  if (!emailAddress || !hallOfResidence) {
    return res
      .status(400)
      .send('`emailAddress` and `hallOfResidence` are required fields');
  }

  try {
    await new User({
      firstName,
      lastName,
      // studentId,
      // upi,
      emailAddress,
      hallOfResidence,
    }).save();
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      console.error(err);
      return res.status(500).send('field was invalid');
    } else if (err.code == 11000) {
      console.error(err);
      return res.status(400).send('user already exists');
    } else {
      console.error(err);
      return res.status(500).send('failed to create user');
    }
  }
  return res.status(200).send('successfully created user');
});

export default userRoutes;
