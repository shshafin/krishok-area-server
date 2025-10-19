import { Schema, model, Document } from 'mongoose';
import { ICompany } from './company.interface';

export interface CompanyDocument extends ICompany, Document {}

const CompanySchema = new Schema<CompanyDocument>(
  {
    englishName: { type: String, required: true },
    banglaName: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true },
);

export const CompanyModel = model<CompanyDocument>('Company', CompanySchema);
