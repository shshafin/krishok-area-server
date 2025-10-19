// src/modules/product/product.routes.ts
import express from 'express';
import auth from '../../middlewares/auth';
import { upload } from '../../middlewares/upload';
import { ProductControllers } from './product.controller';

const router = express.Router();

// ✅ Create Product (with Image Upload)
router.post(
  '/create',
  auth(),
  upload.single('productImage'),
  ProductControllers.createProduct,
);

// ✅ Get All Products
router.get('/all', ProductControllers.getAllProducts);

// ✅ Get Single Product by ID
router.get('/:id', ProductControllers.getSingleProduct);

// ✅ Update Product (with optional image update)
router.put(
  '/:id',
  auth(),
  upload.single('productImage'),
  ProductControllers.updateProduct,
);

// ✅ Delete Product
router.delete('/:id', auth(), ProductControllers.deleteProduct);

export const ProductRoutes = router;
