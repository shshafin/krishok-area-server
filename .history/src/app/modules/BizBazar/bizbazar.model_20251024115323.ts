import { Schema, model } from 'mongoose';
import { TBizBazar } from './bizBazar.interface';

const bizBazarSchema = new Schema<TBizBazar>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String },
    image: { type: String, required: true },
  },
  { timestamps: true },
);

export const BizBazar = model<TBizBazar>('BizBazar', bizBazarSchema);
