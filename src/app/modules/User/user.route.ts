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

// get all users (logged-in users can see)
router.get('/all', auth(), UserControllers.getAllUsers);

// get single user by id
router.get('/:id', auth(), UserControllers.getSingleUser);

export const UserRoutes = router;
