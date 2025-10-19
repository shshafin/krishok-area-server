import { ICompany } from './company.interface';
import { CompanyModel } from './company.model';

// Create Company
const createCompany = async (payload: ICompany) => {
  return await CompanyModel.create(payload);
};

// Get All Companies
const getAllCompanies = async () => {
  return await CompanyModel.find().sort({ createdAt: -1 });
};

// Get Company By ID
const getCompanyById = async (id: string) => {
  return await CompanyModel.findById(id);
};

// Update Company
const updateCompany = async (id: string, payload: Partial<ICompany>) => {
  return await CompanyModel.findByIdAndUpdate(id, payload, { new: true });
};

// Delete Company
const deleteCompany = async (id: string) => {
  return await CompanyModel.findByIdAndDelete(id);
};

export const CompanyServices = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
