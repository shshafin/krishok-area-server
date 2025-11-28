import { TBizBazar } from './bizBazar.interface';
import { BizBazar } from './bizbazar.model';

// Create Biz Bazar
const createBizBazar = async (payload: TBizBazar) => {
  return await BizBazar.create(payload);
};

// Get user's Biz Bazar
const getUserBizBazar = async (userId: string) => {
  return await BizBazar.find({ createdBy: userId }).sort({ createdAt: -1 });
};

// Get all Biz Bazar (public view)
const getAllBizBazars = async () => {
  return await BizBazar.find()
    .populate('user', 'name username profileImage description image createdAt')
    .sort({ createdAt: -1 });
};

// Delete Biz Bazar
const deleteBizBazar = async (bazarId: string, userId: string) => {
  return await BizBazar.findOneAndDelete({ _id: bazarId, createdBy: userId });
};

export const BizBazarServices = {
  createBizBazar,
  getUserBizBazar,
  getAllBizBazars,
  deleteBizBazar,
};
