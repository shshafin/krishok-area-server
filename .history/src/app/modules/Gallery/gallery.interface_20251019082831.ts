import { Types } from 'mongoose';

export interface TGallery {
  user: Types.ObjectId;
  description?: string;
  image: string;
}
