// src/modules/product/product.service.ts

import { IProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProduct = async (payload: IProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

const getAllProducts = async () => {
  const result = await ProductModel.find().populate('company');
  return result;
};

const getProductById = async (id: string) => {
  const result = await ProductModel.findById(id).populate('company');
  return result;
};

const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  const result = await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteProduct = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};



export const ProductServices = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
