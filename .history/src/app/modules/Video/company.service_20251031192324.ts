import { ICompany } from './video.interface';
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

// search company by name
const searchCompanyByName = async (name: string) => {
  return await CompanyModel.find({
    englishName: { $regex: name, $options: 'i' },
    banglaName: { $regex: name, $options: 'i' },
  }).sort({ createdAt: -1 }); // sort by createdAt in descending order
};

export const CompanyServices = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  searchCompanyByName,
};
