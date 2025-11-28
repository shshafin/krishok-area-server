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

const followUser = async (userId: string, targetId: string) => {
  if (userId === targetId) throw new Error("You can't follow yourself");

  const user = await User.findById(userId);
  const target = await User.findById(targetId);

  if (!user || !target) throw new Error('User not found');

  if (!user.following.includes(target._id)) {
    user.following.push(target._id);
    target.followers.push(user._id);

    await user.save();
    await target.save();
  }

  return { following: user.following, followers: target.followers };
};

const unfollowUser = async (userId: string, targetId: string) => {
  const user = await User.findById(userId);
  const target = await User.findById(targetId);

  if (!user || !target) throw new Error('User not found');

  user.following = user.following.filter((f) => !f.equals(target._id));
  target.followers = target.followers.filter((f) => !f.equals(user._id));

  await user.save();
  await target.save();

  return { following: user.following, followers: target.followers };
};

const getFollowers = async (userId: string) => {
  const user = await User.findById(userId).populate('followers', '-password');
  return user?.followers || [];
};

const getFollowing = async (userId: string) => {
  const user = await User.findById(userId).populate('following', '-password');
  return user?.following || [];
};

export const updateUserProfile = async (
  userId: string,
  payload: Partial<TUser>,
) => {
  // user check
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found',
      'Invalid userId',
    );
  }

  // profile update
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: payload },
    { new: true, runValidators: true },
  ).select('-password'); // password hide

  return updatedUser; // updated user return
};

// delete user
export const deleteUser = async (userId: string) => {
  const user = await User.findByIdAndDelete(userId);
  return user;
};

const getUserPhotos = async (userId: string) => {
  const user = await User.findById(userId).select(
    'profileImage coverImage photos',
  );
  if (!user) {
    throw new Error('User not found');
  }

  const photos = [user.profileImage, user.coverImage, ...(user.photos || [])];

  return photos;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsers,
  getSingleUser,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  updateUserProfile,
  getUserPhotos,
};
