// @deno-types="npm:@types/express"
import { Router, Request, Response } from 'npm:express';
import { User } from '../db/models/user.ts';
import { Auth } from '../db/models/auth.ts';
import { sendConfirmationEmail } from '../utils/email.ts';
import { createJWT, verifyJWT } from '../utils/auth.ts';
import mongoose from 'npm:mongoose';

const ONE_WEEK = 3600000;
const authRoutes = Router();

authRoutes.post('/send/:emailAddress', async (req: Request, res: Response) => {
  const { emailAddress } = req.params;
  if (!emailAddress) {
    return res.status(400).send('missing email');
  }
  const foundUser = await User.findOne({ emailAddress });
  if (!foundUser) {
    return res.status(400).send('could not find a user with that email');
  }
  try {
    await sendConfirmationEmail(emailAddress);
  } catch (err) {
    console.error(err);
    return res.status(500).send('failed to send email to that address');
  }
  return res.status(200).send('successfully sent email');
});

authRoutes.post('/verify', async (req: Request, res: Response) => {
  // Extract token
  const { token } = req.body;
  if (!token) {
    return res.status(400).send('missing verification');
  }

  // Delete all expired tokens
  const currentDate = new Date();
  await Auth.deleteMany({
    expiresAt: {
      $lt: currentDate,
    },
  });

  // Delete all expired users
  const expiryDate = Date.now() + ONE_WEEK;
  await User.deleteMany({
    isVerified: false,
    createdAt: {
      $gt: expiryDate,
    },
  });

  // Search for token
  const foundToken = await Auth.findOne({
    token,
  });
  if (!foundToken) {
    return res.status(400).send('invalid token');
  }

  // Search for user
  const { user } = foundToken;

  console.log(`user = ${user as mongoose.Types.ObjectId}`);
  const foundUser = await User.findById(user as mongoose.Types.ObjectId);
  if (!foundUser) {
    return res.status(500).send('could not find associated user');
  }

  // Make sure user is now verified
  await User.findByIdAndUpdate(user, { isVerified: true });
  // Delete auth token as its been used
  await Auth.findByIdAndDelete(foundToken._id);

  const jwtToken = await createJWT(foundUser.toObject());
  return res.status(200).send(jwtToken);
});

export default authRoutes;
