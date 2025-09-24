import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/register',
  validateRequest(UserValidations.userValidationSchema),
  UserControllers.createUser,
);

// get logged-in user profile
router.get('/me', auth(), UserControllers.getMe);

export const UserRoutes = router;
