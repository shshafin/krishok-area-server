import { RequestHandler } from 'express';
import { AuthServices } from './auth.service';

const userLogin: RequestHandler = async (req, res, next) => {
  try {
    const result = await AuthServices.loginExistingUser(req.body);

    res.status(200).json({
      success: true,
      message: 'User login successful',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const logout: RequestHandler = async (req: any, res, next) => {
  try {
    await AuthServices.logoutUser(req.user._id);
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const AuthControllers = {
  userLogin,
  logout,
};
