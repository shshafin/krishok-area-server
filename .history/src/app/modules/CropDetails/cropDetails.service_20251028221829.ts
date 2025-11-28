import { ICropDetail } from './cropDetails.interface';
import { CropDetail } from './cropDetails.model';

const createCropDetail = async (payload: ICropDetail) => {
  return await CropDetail.create(payload);
};

const getAllCropDetails = async () => {
  return await CropDetail.find().sort({ createdAt: -1 });
};

const getSingleCropDetail = async (id: string) => {
  return await CropDetail.findById(id);
};

const getCropDetailsByCropId = async (cropId: string) => {
  return await CropDetail.find({ category: cropId });
};

const updateCropDetail = async (id: string, payload: Partial<ICropDetail>) => {
  return await CropDetail.findByIdAndUpdate(id, payload, { new: true });
};

const deleteCropDetail = async (id: string) => {
  return await CropDetail.findByIdAndDelete(id);
};

export const CropDetailsService = {
  createCropDetail,
  getAllCropDetails,
  getSingleCropDetail,
  updateCropDetail,
  deleteCropDetail,
};
