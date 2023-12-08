import { Request, Response } from 'npm:@types/express';
import { verifyJWT } from '../utils/auth.ts';
import { ObjectId } from 'npm:mongoose';

export async function auth(req: Request, res: Response, next: Function) {
  const authToken = req.header('Authorization')?.substring(7);
  if (!authToken)
    return res.status(400).send('authentication token is required');
  try {
    const payload = await verifyJWT(authToken);
    req.body.user = payload;
    return next();
  } catch {
    return res.status(500).send('invalid authentication token');
  }
}

export async function maybeAuth(req: Request, res: Response, next: Function) {
  const authToken = req.header('Authorization')?.substring(7);
  if (!authToken) return next();
  try {
    const payload = await verifyJWT(authToken);
    console.log(`payload = ${payload.emailAddress}, ${payload.userId}`);
    req.body.user = payload;
    return next();
  } catch (err) {
    console.error(err);
    return next();
  }
}
