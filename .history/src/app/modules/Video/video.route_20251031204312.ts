// src/modules/Video/Video.routes.ts
import express from 'express';
import auth from '../../middlewares/auth';
import { VideoControllers } from './video.controller';

const router = express.Router();

// ➕ Create Video
router.post('/create', auth(), VideoControllers.createVideo);

// 📌 Get All Companies
router.get('/all', VideoControllers.getAllVideos);

// 🔍 Get Video by ID
router.get('/:id', VideoControllers.getVideoById);

// ✏️ Update Video
router.put('/:id', auth(), VideoControllers.updateVideo);

// 🗑️ Delete Video
router.delete('/:id', auth(), VideoControllers.deleteVideo);

// 🔎 Search Video by Name
router.get('/search/:name', VideoControllers.searchVideoByName);

export const VideoRoutes = router;
