import { Schema, model, Types } from 'npm:mongoose';

const TEN_MINUTES = 600000;

const authSchema = new Schema({
  token: {
    type: String,
    default: crypto.randomUUID(),
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
});

export const Auth = model('Auth', authSchema);
