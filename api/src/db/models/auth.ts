import { Schema, Model, Types } from 'npm:mongoose';

const TEN_MINUTES = 600000;

const authSchema = new Schema({
  token: {
    type: Number,
    default: Math.round(Math.random() * 1_000_000),
    unique: true,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  expiresAt: {
    type: Date,
    required: true,
    default: Date.now() + TEN_MINUTES,
  },
  used: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const Auth = new Model('Auth', authSchema);
