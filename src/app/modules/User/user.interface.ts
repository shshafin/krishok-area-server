import { Types } from 'mongoose';

export type TUser = {
  _id?: Types.ObjectId;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  state: string;
  bio?: string;
  profileImage?: string;
  coverImage?: string;
  photos: string[];
  role: 'user' | 'admin';
  following: Types.ObjectId[];
  followers: Types.ObjectId[];
  isOnline: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
