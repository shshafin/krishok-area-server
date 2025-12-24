import { Notification } from './notification.model';

export const NotificationService = {
  create: async (payload: any) => {
    const notification = await Notification.create(payload);
    return notification;
  },

  getUserNotifications: async (userId: string) => {
    return (
      Notification.find({ receiver: userId })
        // FIXED: Added 'name' here so frontend shows Name instead of Username
        .populate('sender', 'name username profileImage')
        .populate('post', 'text images')
        .sort({ createdAt: -1 })
    );
  },

  markAsRead: async (notificationId: string) => {
    return Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true },
    );
  },

  // NEW: Delete single notification
  deleteNotification: async (notificationId: string) => {
    return Notification.findByIdAndDelete(notificationId);
  },

  // NEW: Delete ALL notifications for a specific user
  deleteAllNotifications: async (userId: string) => {
    return Notification.deleteMany({ receiver: userId });
  },
};
