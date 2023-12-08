import { Schema, model, Types } from 'npm:mongoose';

const strikeSchema = new Schema({
  user: {
    type: Types.ObjectId,
    required: true,
  },
  start: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  end: {
    type: Date,
    required: false,
  },
  why: {
    type: String,
    minLength: 4,
    maxLength: 500,
    required: false,
  },
});

export const Strike = model('Strike', strikeSchema);
