import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/User/user.model';
import AppError from '../errors/appError';
import httpStatus from 'http-status';
import config from '../config';

const auth = () => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'Authorization token missing or malformed.',
          'No token or bad token format in Authorization header.',
        );
      }

      const token = authHeader.split(' ')[1];

      let decoded: JwtPayload;
      try {
        decoded = jwt.verify(
          token,
          config.jwt_access_secret as string,
        ) as JwtPayload;
      } catch (err) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'Invalid or expired token.',
          'JWT verification failed',
        );
      }

      const user = await User.findById(decoded._id).select('-password');
      if (!user) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'User not found',
          'User does not exist in DB',
        );
      }

      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
