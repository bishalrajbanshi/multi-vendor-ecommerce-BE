export type User = {
  id: string;
  email: string;
  phone: string;
  isActive: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserInput = {
  email: string;
  phone: string;
  password: string;
};

export type UserUpdate = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;


