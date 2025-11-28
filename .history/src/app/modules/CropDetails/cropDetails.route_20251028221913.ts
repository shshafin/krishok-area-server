import express from 'express';
import auth from '../../middlewares/auth';
import { upload } from '../../middlewares/upload';
import { CropDetailsController } from './cropDetails.controller';

const router = express.Router();

// ✅ Create Crop Detail (image optional or required as per need)
router.post(
  '/create',
  auth(),
  upload.single('cropImage'),
  CropDetailsController.createCropDetail,
);

// ✅ Get All Crop Details
router.get('/all', CropDetailsController.getAllCropDetails);

// ✅ Get Single Crop Detail by ID
router.get('/:id', CropDetailsController.getSingleCropDetail);



// ✅ Update Crop Detail
router.put(
  '/:id',
  auth(),
  upload.single('cropImage'),
  CropDetailsController.updateCropDetail,
);

// ✅ Delete Crop Detail
router.delete('/:id', auth(), CropDetailsController.deleteCropDetail);

export const CropDetailsRoutes = router;
