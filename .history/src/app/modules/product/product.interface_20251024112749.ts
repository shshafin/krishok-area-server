import { Schema } from 'mongoose';

export type TProductCategory =
  | 'আগাছানাশক'
  | 'কীটনাশক'
  | 'ছত্রাকনাশক'
  | 'অনুখাদ্য';

export interface IProduct {
  productName: string;
  materialName: string;
  category: TProductCategory;
  company: Schema.Types.ObjectId;
  productImage: string;
  beboharerShubidha: string;
  foshol: string;
  balai: string;
  matra: string;
  beboharBidhi: string;
}
