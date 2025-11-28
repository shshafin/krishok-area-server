import { Types } from 'mongoose';

export interface IComment {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  text: string;
  createdAt: Date;
}

export interface IPost {
  user: Types.ObjectId;
  text?: string;
  images?: string[];
  videos?: string[];
  likes: Types.ObjectId[];
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}
