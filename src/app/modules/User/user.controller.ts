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

export const UserControllers = {
  createUser,
  getMe,
  getAllUsers,
  getSingleUser,
};
