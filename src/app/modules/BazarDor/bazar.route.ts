import express from 'express';
import auth from '../../middlewares/auth';
import { BazarDorControllers } from './bazar.controller';
import { upload } from '../../middlewares/upload';

const router = express.Router();

// Create Bazar Dor
router.post(
  '/create',
  upload.fields([{ name: 'image', maxCount: 1 }]),
  auth(),
  BazarDorControllers.createBazarDor,
);

// Get My Bazar Dors
router.get('/my', auth(), BazarDorControllers.getMyBazarDor);

// Get All Bazar Dors
router.get('/all', BazarDorControllers.getAllBazarDors);

// Delete Bazar Dor
router.delete('/:id', auth(), BazarDorControllers.deleteBazarDor);

export const BazarDorRoutes = router;
