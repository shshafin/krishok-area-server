import { IVideo } from './video.interface';
import { VideoModel } from './video.model';

// Create Video
const createVideo = async (payload: IVideo) => {
  return await VideoModel.create(payload);
};

// Get All Companies
const getAllCompanies = async () => {
  return await VideoModel.find().sort({ createdAt: -1 });
};

// Get Video By ID
const getVideoById = async (id: string) => {
  return await VideoModel.findById(id);
};

// Update Video
const updateVideo = async (id: string, payload: Partial<IVideo>) => {
  return await VideoModel.findByIdAndUpdate(id, payload, { new: true });
};

// Delete Video
const deleteVideo = async (id: string) => {
  return await VideoModel.findByIdAndDelete(id);
};

// search Video by name
const searchVideoByName = async (name: string) => {
  return await VideoModel.find({
    englishName: { $regex: name, $options: 'i' },
    banglaName: { $regex: name, $options: 'i' },
  }).sort({ createdAt: -1 }); // sort by createdAt in descending order
};

export const VideoServices = {
  createVideo,
  getAllCompanies,
  getVideoById,
  updateVideo,
  deleteVideo,
  searchVideoByName,
};
