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

export const UserControllers = {
  createUser,
};
