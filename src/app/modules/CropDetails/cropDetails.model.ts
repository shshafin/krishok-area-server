import { Schema, model } from 'mongoose';
import { ICropDetail } from './cropDetails.interface';

const CropDetailSchema = new Schema<ICropDetail>(
  {
    cropName: {
      type: String,
      required: true,
      trim: true,
    },
    cropTitle: {
      type: String,
      required: true,
    },
    cropImage: {
      type: String,
      required: true,
    },
    rogLokkho: {
      type: String,
      required: true,
    },
    koroniyo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const CropDetail = model<ICropDetail>('CropDetail', CropDetailSchema);
