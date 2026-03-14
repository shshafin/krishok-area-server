import { Gallery } from './gallery.model';
import { TGallery } from './gallery.interface';

const createGallery = async (payload: TGallery) => {
  return await Gallery.create(payload);
};

const getUserGallery = async (userId: string) => {
  return await Gallery.find({ user: userId }).sort({ createdAt: -1 });
};

const getAllGalleries = async () => {
  return await Gallery.find()
    .populate('user', 'name username profileImage')
    .sort({ createdAt: -1 });
};

const getGalleryById = async (galleryId: string) => {
  return await Gallery.findById(galleryId).populate(
    'user',
    'name username profileImage',
  );
};

const deleteGallery = async (galleryId: string, userId: string) => {
  return await Gallery.findOneAndDelete({ _id: galleryId, user: userId });
};

// ✅ নতুন: update gallery
const updateGallery = async (galleryId: string, payload: Partial<TGallery>) => {
  return await Gallery.findByIdAndUpdate(galleryId, payload, { new: true });
};

export const GalleryServices = {
  createGallery,
  getUserGallery,
  getAllGalleries,
  getGalleryById,
  deleteGallery,
  updateGallery,
};
