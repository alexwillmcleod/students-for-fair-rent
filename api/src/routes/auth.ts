// @deno-types="npm:@types/express"
import { Router, Request, Response } from 'npm:express';
import { User } from '../db/models/user.ts';
import { Auth } from '../db/models/auth.ts';
import { sendConfirmationEmail } from '../utils/email.ts';
import { createJWT, verifyJWT } from '../utils/auth.ts';

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
  } catch {
    return res.status(500).send('failed to send email to that address');
  }
  return res.status(200).send('successfully sent email');
});

authRoutes.post('/verify/:token', async (req: Request, res: Response) => {
  // Extract token
  const { token } = req.params;
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
  const ONE_WEEK = 3600000;
  const expiryDate = Date.now() + ONE_WEEK;
  await User.deleteMany({
    isVerified: false,
    createdAt: {
      $lt: expiryDate,
    },
  });

  // Search for token
  const foundToken = await Auth.findOne({ token });
  if (!foundToken) {
    return res.status(400).send('invalid token');
  }

  // Search for user
  const { user } = foundToken;
  const foundUser = await User.findById(user);
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
