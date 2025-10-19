import { TBazarDor } from './bazar.interface';
import { BazarDor } from './bazar.model';

const createBazarDor = async (payload: TBazarDor) => {
  return await BazarDor.create(payload);
};

const getUserBazarDor = async (userId: string) => {
  return await BazarDor.find({ user: userId }).sort({ createdAt: -1 });
};

// 🔥 New: Get all bazar dor (public view)
const getAllBazarDors = async () => {
  return await BazarDor.find()
    .populate('user', 'name username profileImage state')
    .sort({ createdAt: -1 });
};

const deleteBazarDor = async (bazarId: string, userId: string) => {
  return await BazarDor.findOneAndDelete({ _id: bazarId, user: userId });
};

export const BazarDorServices = {
  createBazarDor,
  getUserBazarDor,
  getAllBazarDors, // ✅ new
  deleteBazarDor,
};
