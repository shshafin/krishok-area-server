import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TUser } from './user.interface';
import { User } from './user.model';

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

export const UserServices = {
  createUserIntoDB,
};
