import { Types } from 'mongoose';

export interface TGallery {
  user: Types.ObjectId;
  title: string;
  description?: string;
  image: string;
}
