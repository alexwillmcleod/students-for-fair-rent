import { load } from 'https://deno.land/std@0.208.0/dotenv/mod.ts';
import {
  Header,
  Payload,
  create,
  getNumericDate,
  verify,
} from 'https://deno.land/x/djwt@v3.0.1/mod.ts';
import mongoose from 'npm:mongoose';
import { UserType } from '../db/models/user.ts';

const env = await load();

const jwtSecret = env['JWT_SECRET'];
const ONE_WEEK = 3600000;

const encoder = new TextEncoder();
const keyBuf = encoder.encode(jwtSecret);

const key = await crypto.subtle.importKey(
  'raw',
  keyBuf,
  { name: 'HMAC', hash: 'SHA-256' },
  true,
  ['sign', 'verify']
);

export const createJWT = async (user: UserType) => {
  // const payload: Payload = {
  const payload: Payload = {
    iss: 'Students for Fair Rent', // issued by sfr
    exp: getNumericDate(ONE_WEEK), // expires in one week
    ...user,
  };

  const algorithm = 'HS256';

  const header: Header = {
    alg: algorithm,
    typ: 'JWT',
  };

  return await create(header, payload, key);
};

export const verifyJWT = async (token: string) => {
  return await verify(token, key);
};
