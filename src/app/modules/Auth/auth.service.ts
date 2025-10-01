import jwt from 'jsonwebtoken';
import AppError from '../../errors/appError';
import { User } from '../User/user.model';
import { TUserLogin } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import httpStatus from 'http-status';

// ------------------------------
// LOGIN SERVICE
// ------------------------------
const loginExistingUser = async (payload: TUserLogin) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );
  if (!user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Invalid credentials.',
      'User not found with provided email.',
    );
  }

  const isMatched = await bcrypt.compare(payload.password, user.password);
  if (!isMatched) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Invalid credentials.',
      'Password did not match for user.',
    );
  }

  user.isOnline = true;
  await user.save();

  const jwtPayload = {
    _id: user._id,
    email: user.email,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    accessToken: accessToken,
  };
};

// ------------------------------
// LOG OUT SERVICE
// ------------------------------
const logoutUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (user) {
    user.isOnline = false;
    await user.save();
  }
  return user;
};

// ------------------------------
// PASSWORD CHANGE
// ------------------------------
const resetPassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
) => {
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found',
      'Invalid user ID',
    );
  }

  // old password check
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Old password incorrect',
      'Provided old password did not match',
    );
  }

  user.password = newPassword;

  await user.save();

  return { message: 'Password reset successful' };
};

export const AuthServices = {
  loginExistingUser,
  logoutUser,
  resetPassword,
};
