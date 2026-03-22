import { Gender } from 'src/core/database/enums/gender.enums';
export type Vendor = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type VendorProfile = {
  id: string;
  vendorId: string;
  fullName: string;
  profile?: string;
  dob?: Date;
  gender?: Gender;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateVendorInput = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

export type VendorUpdate = Partial<Pick<Vendor, 'phone' | 'email'>>;

