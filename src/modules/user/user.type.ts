import { GenderEnum } from "src/core/drizzle/schema";

export type User = {
  id: string;
  email: string;
  phone: string;
  isActive: boolean;
  fullName: string;
  profile?: string;
  dob?: Date;
  gender?:keyof typeof GenderEnum;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserInput = {
  email: string;
  phone: string;
  fullName: string;
  profile?: string;
  dob?: Date;
  gender?:keyof typeof GenderEnum;
  password: string;
};

export type UserUpdate = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;


