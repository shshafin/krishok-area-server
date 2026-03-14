import { Types } from 'mongoose';

export interface TGallery {
  user: Types.ObjectId;
  description?: string;
  title
  image: string;
}
