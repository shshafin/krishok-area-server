import { Schema, model, Document } from 'mongoose';
import { CropCategory, ICrop } from './crop.interface';

export interface CropDocument extends ICrop, Document {}

const CropSchema = new Schema<CropDocument>(
  {
    englishName: { type: String, required: true },
    banglaName: { type: String, required: true },
    category: {
      type: String,
      enum: ['রোগবালাই', 'ক্ষতিকর পোকামাকড়'] as CropCategory[],
      required: true,
    },
    image: { type: String, required: true },
  },
  { timestamps: true },
);

export const CropModel = model<CropDocument>('Crop', CropSchema);
