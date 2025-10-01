import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userLoginValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';
const router = Router();

router.post(
  '/login',
  validateRequest(userLoginValidations.userLoginValidationSchema),
  AuthControllers.userLogin,
);

// Logout route (protected)
router.post('/logout', auth(), AuthControllers.logout);

// Reset password
router.post('/reset-password', auth(), AuthControllers.resetPasswordController);

export const AuthRoutes = router;
