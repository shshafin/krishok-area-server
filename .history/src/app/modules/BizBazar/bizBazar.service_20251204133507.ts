import mongoose from 'mongoose';
import { TBizBazar } from './bizBazar.interface';
import { BizBazar } from './bizbazar.model';

// Create Biz Bazar
const createBizBazar = async (payload: TBizBazar) => {
  return await BizBazar.create(payload);
};

// Get user's Biz Bazar
const getUserBizBazar = async (userId: string) => {
  return await BizBazar.find({ user: new mongoose.Types.ObjectId(userId) })
    .populate(
      'user',
      'name username profileImage phone state description image createdAt',
    )
    .sort({ createdAt: -1 });
};

// Get all Biz Bazar (public view)
const getAllBizBazars = async () => {
  return await BizBazar.find()
    .populate(
      'user',
      'name email username profileImage phone state description image createdAt',
    )
    .sort({ createdAt: -1 });
};

// Delete Biz Bazar
const deleteBizBazar = async (bazarId: string) => {
  if (!mongoose.Types.ObjectId.isValid(bazarId)) {
    throw new Error('Invalid Bazar ID');
  }
  return await BizBazar.findByIdAndDelete(bazarId);
};

export const BizBazarServices = {
  createBizBazar,
  getUserBizBazar,
  getAllBizBazars,
  deleteBizBazar,
};
