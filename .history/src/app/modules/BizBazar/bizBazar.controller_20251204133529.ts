import { RequestHandler } from 'express';
import { BizBazarServices } from './bizBazar.service';

const createBizBazar: RequestHandler = async (req: any, res, next) => {
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

    const result = await BizBazarServices.createBizBazar(payload);

    res.status(201).json({
      success: true,
      message: 'Biz Bazar created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getMyBizBazar: RequestHandler = async (req: any, res, next) => {
  try {
    const userId = req.user._id;
    const result = await BizBazarServices.getUserBizBazar(userId);

    res.status(200).json({
      success: true,
      message: 'Your Biz Bazars fetched successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllBizBazars: RequestHandler = async (req, res, next) => {
  try {
    const result = await BizBazarServices.getAllBizBazars();
    res.status(200).json({
      success: true,
      message: 'All Biz Bazars fetched successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBizBazar: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await BizBazarServices.deleteBizBazar(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Biz Bazar not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Biz Bazar deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const BizBazarControllers = {
  createBizBazar,
  getMyBizBazar,
  getAllBizBazars,
  deleteBizBazar,
};
