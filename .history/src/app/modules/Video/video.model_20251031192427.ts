import { Schema, model, Document } from 'mongoose';
import { IVideo } from './video.interface';


export interface CompanyDocument extends IVideo, Document {}

const CompanySchema = new Schema<CompanyDocument>(
  {
    englishName: { type: String, required: true },
    banglaName: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true },
);

export const CompanyModel = model<CompanyDocument>('Company', CompanySchema);
