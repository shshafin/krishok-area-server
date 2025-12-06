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

  getSinglePost: async (id: string) => {
    const result = await Post.findById(id)
      .populate('user') // Populate author details
      .populate('comments'); // Populate comments if needed
    return result;
  },

  markAsRead: async (notificationId: string) => {
    return Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true },
    );
  },
};
