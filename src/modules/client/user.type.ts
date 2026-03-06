import { GenderEnum } from 'src/core/drizzle/schema';
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export type User = {
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

export type UserProfile = {
  id: string;
  userId: string;
  fullName: string;
  profile?: string;
  dob?: Date;
  gender?: Gender;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserInput = {
  phone: string;
};

export type UserUpdate = Partial<Pick<User, 'phone' | 'email'>>;
export type UserProfileUpdate = Partial<
  Omit<UserProfile, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
>;
