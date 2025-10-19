import { Schema, model } from 'mongoose';
import { TBazarDor } from './bazar.interface';

const bazarDorSchema = new Schema<TBazarDor>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String },
    image: { type: String, required: true },
  },
  { timestamps: true },
);

export const BazarDor = model<TBazarDor>('BazarDor', bazarDorSchema);
