/* eslint-disable no-unused-vars */
import { RequestHandler } from 'express';
import { UserServices } from './user.service';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserServices.createUserIntoDB(req.body);
    const {
      _id,
      name,
      username,
      email,
      phone,
      state,
      role,
      createdAt,
      updatedAt,
    } = result;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        _id,
        name,
        username,
        email,
        phone,
        state,
        role,
        createdAt,
        updatedAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getMe: RequestHandler = async (req: any, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await UserServices.getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleUser: RequestHandler = async (req: any, res, next) => {
  try {
    const userId = req.params.id;
    const user = await UserServices.getSingleUser(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// delete user
const deleteUser: RequestHandler = async (req: any, res, next) => {
  try {
    const userId = req.params.id;
    const user = await UserServices.deleteUser(userId);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

const follow: RequestHandler = async (req: any, res, next) => {
  try {
    const targetId = req.params.id;
    const userId = req.user._id;

    const result = await UserServices.followUser(userId, targetId);
    res
      .status(200)
      .json({ success: true, message: 'Followed user', data: result });
  } catch (err) {
    next(err);
  }
};

const unfollow: RequestHandler = async (req: any, res, next) => {
  try {
    const targetId = req.params.id;
    const userId = req.user._id;

    const result = await UserServices.unfollowUser(userId, targetId);
    res
      .status(200)
      .json({ success: true, message: 'Unfollowed user', data: result });
  } catch (err) {
    next(err);
  }
};

const getFollowers: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const followers = await UserServices.getFollowers(userId);

    res.status(200).json({ success: true, data: followers });
  } catch (err) {
    next(err);
  }
};

const getFollowing: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const following = await UserServices.getFollowing(userId);

    res.status(200).json({ success: true, data: following });
  } catch (err) {
    next(err);
  }
};

export const updateProfile: RequestHandler = async (
  req: any,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: any,
) => {
  try {
    const userId = req.user._id;
    const payload: any = req.body;

    // multiple file support
    if (req.files) {
      const files = req.files as { [key: string]: any[] };
      if (files.profileImage) {
        payload.profileImage = `/uploads/${files.profileImage[0].filename}`;
      }
      if (files.coverImage) {
        payload.coverImage = `/uploads/${files.coverImage[0].filename}`;
      }
    }

    const updatedUser = await UserServices.updateUserProfile(userId, payload);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
};
const getUserPhotosController: RequestHandler = async (req: any, res: any) => {
  try {
    const userId = req.params.id;

    const photos = await UserServices.getUserPhotos(userId);

    res.status(200).json({
      success: true,
      photos,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
};

export const UserControllers = {
  createUser,
  getMe,
  getAllUsers,
  getSingleUser,
  follow,
  unfollow,
  getFollowers,
  getFollowing,
  updateProfile,
  getUserPhotosController,
};
