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

const resetPasswordController: RequestHandler = async (req: any, res, next) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const result = await AuthServices.resetPassword(
      userId,
      oldPassword,
      newPassword,
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    next(error);
  }
};

export const AuthControllers = {
  userLogin,
  logout,
  resetPasswordController,
};
