// @deno-types="npm:@types/express"
import { Router, Request, Response } from 'npm:express';
import { User } from '../db/models/user.ts';
import { Auth } from '../db/models/auth.ts';
import mongoose from 'npm:mongoose';

const authRoutes = Router();

authRoutes.post('/send', async (req: Request, res: Response) => {});
