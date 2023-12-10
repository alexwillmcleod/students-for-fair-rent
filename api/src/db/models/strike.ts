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
  hallOfResidence: {
    type: String,
    required: true,
    enum: [
      "O'Rorke",
      'Grafton',
      'University Hall Towers',
      'Waiparuru',
      'Carlaw Park Stuart McCutcheon House',
      'Carlaw Park Nicholls',
      '55 Symonds',
      'Te Tirohanga o te Toangaroa',
    ],
  },
  isAnonymous: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const Strike = model('Strike', strikeSchema);
