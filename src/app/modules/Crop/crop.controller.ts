// src/modules/crop/crop.controller.ts
import { RequestHandler } from 'express';
import { CropServices } from './crop.service';

const createCrop: RequestHandler = async (req: any, res, next) => {
  try {
    const { englishName, banglaName, category } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: 'Image is required' });
    }

    const payload = {
      englishName,
      banglaName,
      category,
      image: `/uploads/${req.file.filename}`,
    };

    const result = await CropServices.createCrop(payload);
    res
      .status(201)
      .json({ success: true, message: 'Crop created', data: result });
  } catch (err) {
    next(err);
  }
};

const getAllCrops: RequestHandler = async (req, res, next) => {
  try {
    const result = await CropServices.getAllCrops();
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const getCropById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await CropServices.getCropById(id);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Crop not found' });
    }

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const updateCrop: RequestHandler = async (req: any, res, next) => {
  try {
    const { id } = req.params;
    const payload: any = req.body;

    if (req.file) {
      payload.image = `/uploads/${req.file.filename}`;
    }

    const result = await CropServices.updateCrop(id, payload);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Crop not found' });
    }

    res
      .status(200)
      .json({ success: true, message: 'Crop updated', data: result });
  } catch (err) {
    next(err);
  }
};

const deleteCrop: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await CropServices.deleteCrop(id);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Crop not found' });
    }

    res.status(200).json({ success: true, message: 'Crop deleted' });
  } catch (err) {
    next(err);
  }
};

export const CropControllers = {
  createCrop,
  getAllCrops,
  getCropById,
  updateCrop,
  deleteCrop,
};
