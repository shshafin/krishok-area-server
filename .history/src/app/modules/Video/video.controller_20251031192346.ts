// src/modules/company/company.controller.ts
import { RequestHandler } from 'express';
import { CompanyServices } from './video.service';

// ➕ Create Company
const createCompany: RequestHandler = async (req: any, res, next) => {
  try {
    const { englishName, banglaName, location } = req.body;

    const payload = {
      englishName,
      banglaName,
      location,
    };

    const result = await CompanyServices.createCompany(payload);
    res.status(201).json({
      success: true,
      message: 'Company created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// 📌 Get All Companies
const getAllCompanies: RequestHandler = async (req, res, next) => {
  try {
    const result = await CompanyServices.getAllCompanies();
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

// 🔍 Get Company By ID
const getCompanyById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await CompanyServices.getCompanyById(id);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Company not found' });
    }

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

// ✏️ Update Company
const updateCompany: RequestHandler = async (req: any, res, next) => {
  try {
    const { id } = req.params;
    const payload: any = req.body;

    const result = await CompanyServices.updateCompany(id, payload);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Company not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Company updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// 🗑️ Delete Company
const deleteCompany: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await CompanyServices.deleteCompany(id);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Company not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Company deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

// search company by name
const searchCompanyByName: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.params;
    const result = await CompanyServices.searchCompanyByName(name);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const CompanyControllers = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  searchCompanyByName,
};
