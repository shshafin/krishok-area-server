import { Types } from 'mongoose';

export interface TBazarDor {
  user: Types.ObjectId;
  description?: string;
  image: string;
}
