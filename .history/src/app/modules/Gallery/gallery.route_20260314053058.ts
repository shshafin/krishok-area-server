import express from 'express';
import { upload } from '../../middlewares/upload';
import { GalleryControllers } from './gallery.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Create gallery
router.post(
  '/create',
  auth(),
  upload.fields([{ name: 'image', maxCount: 1 }]),
  GalleryControllers.createGallery,
);

// Get my galleries
router.get('/my', auth(), GalleryControllers.getMyGallery);

// Get all galleries
router.get('/all', GalleryControllers.getAllGalleries);

// ✅ নতুন: Update gallery
// ⚠️ PUT /:id অবশ্যই GET /:id এর আগে — নাহলে Express conflict করে
router.put(
  '/:id',
  auth(),
  upload.fields([{ name: 'image', maxCount: 1 }]),
  GalleryControllers.updateGallery,
);

// Get single gallery by ID (public)
router.get('/:id', GalleryControllers.getGalleryById);

// Delete gallery
router.delete('/:id', auth(), GalleryControllers.deleteGallery);

export const GalleryRoutes = router;
