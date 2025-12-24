import express from 'express';
import {
  getNotifications,
  markNotificationRead,
  deleteNotification,
  clearAllNotifications,
} from './notification.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth(), getNotifications);
router.patch('/:notificationId/read', auth(), markNotificationRead);

// NEW ROUTES
// IMPORTANT: Put 'clear-all' BEFORE '/:notificationId' to avoid conflict
router.delete('/clear-all', auth(), clearAllNotifications);
router.delete('/:notificationId', auth(), deleteNotification);

export const NotificationRoutes = router;
