import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { upload } from '../../middlewares/upload';

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

// delete user
router.delete('/me', auth(), UserControllers.deleteCurrentUser);

// Follow/unfollow
router.post('/follow/:id', auth(), UserControllers.follow);
router.post('/unfollow/:id', auth(), UserControllers.unfollow);

// Followers/following
router.get('/followers/:id', auth(), UserControllers.getFollowers);
router.get('/following/:id', auth(), UserControllers.getFollowing);

router.put(
  '/profile',
  auth(),
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  UserControllers.updateProfile,
);

router.get('/:id/photos', auth(), UserControllers.getUserPhotosController);

export const UserRoutes = router;
