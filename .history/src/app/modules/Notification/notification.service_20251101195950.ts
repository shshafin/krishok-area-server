import { Notification } from './notification.model';

export const NotificationService = {
  create: async (payload: any) => {
    const notification = await Notification.create(payload);
    return notification;
  },

  getUserNotifications: async (userId: string) => {
    return Notification.find({ receiver: userId })
      .populate('sender', 'username profileImage')
      .populate('post', 'text images')
      .sort({ createdAt: -1 });
  },

  markAsRead: async (notificationId: string) => {
    return Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
  },
};
