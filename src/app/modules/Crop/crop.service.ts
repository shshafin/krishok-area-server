// src/modules/crop/crop.service.ts
import { ICrop } from './crop.interface';
import { CropModel } from './crop.model';

const createCrop = async (payload: ICrop) => {
  return await CropModel.create(payload);
};

const getAllCrops = async () => {
  return await CropModel.find().sort({ createdAt: -1 });
};

const getCropById = async (id: string) => {
  return await CropModel.findById(id);
};

const updateCrop = async (id: string, payload: Partial<ICrop>) => {
  return await CropModel.findByIdAndUpdate(id, payload, { new: true });
};

const deleteCrop = async (id: string) => {
  return await CropModel.findByIdAndDelete(id);
};

export const CropServices = {
  createCrop,
  getAllCrops,
  getCropById,
  updateCrop,
  deleteCrop,
};
