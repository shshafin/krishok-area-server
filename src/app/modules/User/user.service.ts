import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TUser } from './user.interface';
import { User } from './user.model';
import { Types } from 'mongoose';

const createUserIntoDB = async (payload: TUser) => {
  const { username, email } = payload;

  // check duplicate username or email
  const isUserExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExists) {
    throw new AppError(
      httpStatus.ALREADY_REPORTED,
      'Username or Email already exists!',
      'create user with another username and email',
    );
  }

  // create user
  const result = await User.create(payload);

  return result;
};

const getAllUsers = async () => {
  const users = await User.find().select('-password'); // password exclude
  return users;
};

const getSingleUser = async (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) return null;

  const user = await User.findById(userId).select('-password');
  return user;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsers,
  getSingleUser,
};
