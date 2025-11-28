import { IVideo } from './video.interface';
import { VideoModel } from './video.model';

// Create Video
const createVideo = async (payload: IVideo) => {
  return await VideoModel.create(payload);
};

// Get All Videos
const getAllVideos = async () => {
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

export const VideoServices = {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
};
