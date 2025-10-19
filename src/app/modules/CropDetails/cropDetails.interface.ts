import { Schema } from 'mongoose';

export interface ICropDetail {
  _id?: string;
  category: Schema.Types.ObjectId;
  cropTitle: string;
  cropImage: string;
  rogLokkho: string;
  koroniyo: string;
  createdAt?: Date;
  updatedAt?: Date;
}
