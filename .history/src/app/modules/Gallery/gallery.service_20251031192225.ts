import { Gallery } from './gallery.model';
import { TGallery } from './gallery.interface';

const createGallery = async (payload: TGallery) => {
  return await Gallery.create(payload);
};

const getUserGallery = async (userId: string) => {
  return await Gallery.find({ user: userId }).sort({ createdAt: -1 });
};

// 🔥 New: Get all galleries (public view)
const getAllGalleries = async () => {
  return await Gallery.find()
    .populate('user', 'name username profileImage')
    .sort({ createdAt: -1 });
};

const deleteGallery = async (galleryId: string, userId: string) => {
  return await Gallery.findOneAndDelete({ _id: galleryId, user: userId });
};

export const GalleryServices = {
  createGallery,
  getUserGallery,
  getAllGalleries, 
};
