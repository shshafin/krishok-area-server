import express from 'express';
import { getNotifications, markNotificationRead } from './notification.controller';
import { authMiddleware } from '../middlewares/auth';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth(), getNotifications);
router.patch('/:notificationId/read', authMiddleware, markNotificationRead);

export default router;
