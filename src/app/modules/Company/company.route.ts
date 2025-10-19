// src/modules/company/company.routes.ts
import express from 'express';
import auth from '../../middlewares/auth';
import { CompanyControllers } from './company.controller';

const router = express.Router();

// ➕ Create Company
router.post('/create', auth(), CompanyControllers.createCompany);

// 📌 Get All Companies
router.get('/all', CompanyControllers.getAllCompanies);

// 🔍 Get Company by ID
router.get('/:id', CompanyControllers.getCompanyById);

// ✏️ Update Company
router.put('/:id', auth(), CompanyControllers.updateCompany);

// 🗑️ Delete Company
router.delete('/:id', auth(), CompanyControllers.deleteCompany);

export const CompanyRoutes = router;
