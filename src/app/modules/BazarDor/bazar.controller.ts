import { RequestHandler } from 'express';
import { BazarDorServices } from './bazar.service';

const createBazarDor: RequestHandler = async (req: any, res, next) => {
  try {
    const userId = req.user._id;
    const { description } = req.body;
    const payload: any = { user: userId, description };

    // ✅ Handle image upload
    if (req.files && req.files.image) {
      payload.image = `/uploads/${req.files.image[0].filename}`;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    const result = await BazarDorServices.createBazarDor(payload);

    res.status(201).json({
      success: true,
      message: 'Bazar Dor created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getMyBazarDor: RequestHandler = async (req: any, res, next) => {
  try {
    const userId = req.user._id;
    const result = await BazarDorServices.getUserBazarDor(userId);

    res.status(200).json({
      success: true,
      message: 'Your Bazar Dors fetched successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllBazarDors: RequestHandler = async (req, res, next) => {
  try {
    const result = await BazarDorServices.getAllBazarDors();
    res.status(200).json({
      success: true,
      message: 'All Bazar Dors fetched successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBazarDor: RequestHandler = async (req: any, res, next) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const result = await BazarDorServices.deleteBazarDor(id, userId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Bazar Dor not found or unauthorized',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bazar Dor deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const BazarDorControllers = {
  createBazarDor,
  getMyBazarDor,
  getAllBazarDors,
  deleteBazarDor,
};
