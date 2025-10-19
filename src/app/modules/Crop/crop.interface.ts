export type CropCategory = 'রোগবালাই' | 'ক্ষতিকর পোকামাকড়';

export interface ICrop {
  englishName: string;
  banglaName: string;
  image: string;
  category: CropCategory;
  createdAt?: Date;
  updatedAt?: Date;
}
