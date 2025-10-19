import { Request, Response } from 'express';
import { CropDetailsService } from './cropDetails.service';

const createCropDetail = async (req: Request, res: Response) => {
  try {
    const { cropName, cropTitle, rogLokkho, koroniyo } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: 'Image is required' });
    }

    const payload = {
      cropName,
      cropTitle,
      rogLokkho,
      koroniyo,
      cropImage: `/uploads/${req.file.filename}`,
    };

    const result = await CropDetailsService.createCropDetail(payload);

    res.status(201).json({
      success: true,
      message: 'Crop detail created successfully',
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to create crop detail', error });
  }
};

const getAllCropDetails = async (req: Request, res: Response) => {
  try {
    const result = await CropDetailsService.getAllCropDetails();
    res.status(200).json({
      success: true,
      message: 'All crop details fetched',
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error fetching data', error });
  }
};

const getSingleCropDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await CropDetailsService.getSingleCropDetail(id);
    res.status(200).json({
      success: true,
      message: 'Single crop detail fetched',
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error fetching data', error });
  }
};

const updateCropDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload: any = req.body;

    if (req.file) {
      payload.cropImage = `/uploads/${req.file.filename}`;
    }

    const result = await CropDetailsService.updateCropDetail(id, payload);
    res
      .status(200)
      .json({ success: true, message: 'Crop detail updated', data: result });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to update crop detail', error });
  }
};

const deleteCropDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await CropDetailsService.deleteCropDetail(id);
    res
      .status(200)
      .json({ success: true, message: 'Crop detail deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to delete', error });
  }
};

export const CropDetailsController = {
  createCropDetail,
  getAllCropDetails,
  getSingleCropDetail,
  updateCropDetail,
  deleteCropDetail,
};
