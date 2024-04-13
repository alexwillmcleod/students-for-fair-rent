import { Schema, model } from 'npm:mongoose';

const gameSessionSchema = new Schema({
  start: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  end: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  numberOfWeeks: {
    type: Number,
    required: true,
    default: 1,
  },
  isGameOver: {
    type: Boolean,
    required: true,
    default: false,
  },
  money: {
    type: Number,
    required: true,
    default: 0,
  },
  totalDebt: {
    type: Number,
    required: true,
    default: 0,
  },
  grade: {
    type: Number,
    required: true,
    default: 100,
  },
  lossReason: {
    type: String,
  },
});
export const GameSession = model('GameSession', gameSessionSchema);
