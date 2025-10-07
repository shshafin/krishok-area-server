import { Schema, model } from 'mongoose';
import { TGallery } from './gallery.interface';

const gallerySchema = new Schema<TGallery>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
  },
  { timestamps: true },
);

export const Gallery = model<TGallery>('Gallery', gallerySchema);
