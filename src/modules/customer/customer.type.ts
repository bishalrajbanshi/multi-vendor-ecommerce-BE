import { Gender } from 'src/core/database/enums/gender.enums';
export type Customer = {
  id: string;
  email: string;
  phone: string;
  isActive: boolean;
  fullName: string;
  profile?: string;
  dob?: Date;
  gender?: Gender;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CustomerProfile = {
  id: string;
  userId: string;
  fullName: string;
  profile?: string;
  dob?: Date;
  gender?: Gender;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateCustomerInput = {
  phone: string;
};

export type CustomerUpdate = Partial<Pick<Customer, 'phone' | 'email'>>;
export type CustomerProfileUpdate = Partial<
  Omit<CustomerProfile, 'id' | 'customerId' | 'createdAt' | 'updatedAt'>
>;
