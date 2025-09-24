import { Response, NextFunction } from 'express';
import AppError from '../errors/appError';
import httpStatus from 'http-status';

export const roleGuard = (roles: ('user' | 'admin')[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new AppError(httpStatus.UNAUTHORIZED, 'Not authorized', 'role guard'),
      );
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          httpStatus.FORBIDDEN,
          'You do not have permission to access this route',
          'role guard',
        ),
      );
    }

    next();
  };
};
