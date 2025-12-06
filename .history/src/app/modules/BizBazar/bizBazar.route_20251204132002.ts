import express from 'express';
import auth from '../../middlewares/auth';
import { BizBazarControllers } from './bizBazar.controller';
import { upload } from '../../middlewares/upload';

const router = express.Router();

// Create Biz Bazar
router.post(
  '/create',
  upload.fields([{ name: 'image', maxCount: 1 }]),
  auth(),
  BizBazarControllers.createBizBazar,
);

// Get My Biz Bazars
router.get('/my', auth(), BizBazarControllers.getMyBizBazar);

// Get All Biz Bazars
router.get('/all', BizBazarControllers.getAllBizBazars);

// Delete Biz Bazar
router.delete('/:id', auth(), BizBazarControllers.deleteBizBazar);

export const BizBazarRoutes = router;
