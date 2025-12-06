import { Request, Response } from 'express';
import { NotificationService } from './notification.service';
import httpStatus from 'http-status';

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const notifications =
      await NotificationService.getUserNotifications(userId);

    res.status(httpStatus.OK).json({
      success: true,
      notifications,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

export const markNotificationRead = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params;
    const notification = await NotificationService.markAsRead(notificationId);

    res.status(httpStatus.OK).json({
      success: true,
      notification,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};
