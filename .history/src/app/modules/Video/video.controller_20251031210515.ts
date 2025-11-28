// src/modules/Video/Video.controller.ts
import { RequestHandler } from 'express';
import { VideoServices } from './video.service';

// ➕ Create Video
const createVideo: RequestHandler = async (req: any, res, next) => {
  try {
    const { videoUrl, description } = req.body;

    const payload = {
      videoUrl,
      description,
    };

    const result = await VideoServices.createVideo(payload);
    res.status(201).json({
      success: true,
      message: 'Video created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// 📌 Get All Videos
const getAllVideos: RequestHandler = async (req, res, next) => {
  try {
    const result = await VideoServices.getAllVideos();
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

// 🔍 Get Video By ID
const getVideoById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await VideoServices.getVideoById(id);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Video not found' });
    }

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

// ✏️ Update Video
const updateVideo: RequestHandler = async (req: any, res, next) => {
  try {
    const { id } = req.params;
    const payload: any = req.body;

    const result = await VideoServices.updateVideo(id, payload);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Video not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Video updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// 🗑️ Delete Video
const deleteVideo: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await VideoServices.deleteVideo(id);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Video not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Video deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const VideoControllers = {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
};
