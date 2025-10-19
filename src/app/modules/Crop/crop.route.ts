// src/modules/crop/crop.routes.ts
import express from 'express';
import auth from '../../middlewares/auth';
import { CropControllers } from './crop.controller';
import { upload } from '../../middlewares/upload';

const router = express.Router();

// Create Crop (image required)
router.post(
  '/create',
  auth(),
  upload.single('image'),
  CropControllers.createCrop,
);

// Get All Crops
router.get('/all', CropControllers.getAllCrops);

// Get Crop by ID
router.get('/:id', CropControllers.getCropById);

// Update Crop
router.put('/:id', auth(), upload.single('image'), CropControllers.updateCrop);

// Delete Crop
router.delete('/:id', auth(), CropControllers.deleteCrop);

export const CropRoutes = router;
