import { Types } from 'mongoose';

export interface TBizBazar {
  user: Types.ObjectId;
  description?: string;
  image: string;
}
