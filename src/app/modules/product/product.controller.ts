// src/modules/product/product.controller.ts
import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      productName,
      materialName,
      category,
      company,
      beboharerShubidha,
      foshol,
      balai,
      matra,
      beboharBidhi,
    } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: 'Product image is required' });
    }

    const payload = {
      productName,
      materialName,
      category,
      company,
      beboharerShubidha,
      foshol,
      balai,
      matra,
      beboharBidhi,
      productImage: `/uploads/${req.file.filename}`,
    };

    const result = await ProductServices.createProduct(payload);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to create product', error });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProducts();
    res.status(200).json({
      success: true,
      message: 'All products fetched successfully',
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch products', error });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await ProductServices.getProductById(id);
    res.status(200).json({
      success: true,
      message: 'Single product fetched successfully',
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch product', error });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload: any = req.body;

    if (req.file) {
      payload.productImage = `/uploads/${req.file.filename}`;
    }

    const result = await ProductServices.updateProduct(id, payload);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to update product', error });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ProductServices.deleteProduct(id);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to delete product', error });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
