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
  role: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
};
