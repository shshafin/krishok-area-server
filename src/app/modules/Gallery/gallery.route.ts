import express from 'express';
import { upload } from '../../middlewares/upload';
import { GalleryControllers } from './gallery.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create',
  auth(),
  upload.fields([{ name: 'image', maxCount: 1 }]),
  GalleryControllers.createGallery,
);

router.get('/my', auth(), GalleryControllers.getMyGallery);
router.get('/all', GalleryControllers.getAllGalleries);
router.delete('/:id', auth(), GalleryControllers.deleteGallery);

export const GalleryRoutes = router;
