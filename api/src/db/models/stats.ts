import { Schema, model } from 'npm:mongoose';

const statsSchema = new Schema({
  totalStrikerCount: Number,
  concurrentStrikerCount: Number,
  totalDollarCount: Number,
  calculatedAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

export const Stats = model('stats', statsSchema);
