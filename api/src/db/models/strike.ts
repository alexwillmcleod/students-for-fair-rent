import { Schema, model, Types } from 'npm:mongoose';

export enum ResidenceEnum {
  "O'Rorke" = "O'Rorke",
  'Waipārūrū' = 'Waipārūrū',
  'University Hall Towers' = 'University Hall Towers',
  'Grafton' = 'Grafton',
  'Carlaw Park Stuart McCutcheon House' = 'Carlaw Park Stuart McCutcheon House',
  'Carlaw Park Nicholls' = 'Carlaw Park Nicholls',
  'Te Tirohanga o te Tōangaroa' = 'Te Tirohanga o te Tōangaroa',
  '55 Symonds' = '55 Symonds',
}

export type Residence = keyof typeof ResidenceEnum;

const strikeSchema = new Schema({
  firstName: {
    type: String,
    maxLength: 20,
    minLength: 2,
  },
  lastName: {
    type: String,
    maxLength: 20,
    required: false,
  },
  emailAddress: {
    type: String,
    unique: true,
    maxLength: 72,
    minLength: 4,
    trim: true,
    lowercase: true,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
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
    enum: ResidenceEnum,
  },
  isAnonymous: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export const Strike = model('Strike', strikeSchema);
