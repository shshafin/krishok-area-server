import { Schema, model, Document, Types } from 'mongoose';
import { IProduct } from './product.interface';

export interface IProductDocument extends IProduct, Document {}

const ProductSchema = new Schema<IProductDocument>(
  {
    productName: { type: String, required: true },
    materialName: { type: String, required: true },
    category: {
      type: String,
      enum: ['আগাছানাশক', 'কীটনাশক', 'ছত্রাকনাশক', 'অনুখাদ্য'],
      required: true,
    },
    company: {
      type: Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    beboharerShubidha: {
      type: String,
      required: true,
    },
    foshol: {
      type: String,
      required: true,
    },
    balai: {
      type: String,
      required: true,
    },
    matra: {
      type: String,
      required: true,
    },
    beboharBidhi: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ProductModel = model<IProductDocument>('Product', ProductSchema);
