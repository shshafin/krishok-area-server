import { RequestHandler } from 'express';
import { GalleryServices } from './gallery.service';

const createGallery: RequestHandler = async (req: any, res, next) => {
  try {
    const userId = req.user._id;
    const { title, description } = req.body;
    const payload: any = { user: userId, title, description };

    // ✅ Handle image upload
    if (req.files && req.files.image) {
      payload.image = `/uploads/${req.files.image[0].filename}`;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    const result = await GalleryServices.createGallery(payload);

    res.status(201).json({
      success: true,
      message: 'Gallery item created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getMyGallery: RequestHandler = async (req: any, res, next) => {
  try {
    const userId = req.user._id;
    const result = await GalleryServices.getUserGallery(userId);

    res.status(200).json({
      success: true,
      message: 'Gallery fetched successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllGalleries: RequestHandler = async (req, res, next) => {
  try {
    const result = await GalleryServices.getAllGalleries();
    res.status(200).json({
      success: true,
      message: 'All galleries fetched successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteGallery: RequestHandler = async (req: any, res, next) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const result = await GalleryServices.deleteGallery(id, userId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Gallery not found or unauthorized',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const GalleryControllers = {
  createGallery,
  getMyGallery,
  getAllGalleries,
  deleteGallery,
};
