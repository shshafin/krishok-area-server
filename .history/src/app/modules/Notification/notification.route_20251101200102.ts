import express from 'express';
import { getNotifications, markNotificationRead } from './notification.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth(), getNotifications);
router.patch('/:notificationId/read', auth(), markNotificationRead);

export default ;
