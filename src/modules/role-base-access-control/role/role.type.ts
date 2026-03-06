export type Role = {
  id: string;
  name: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type RoleInsert = {
  name: string;
  status?: boolean;
};

export type RoleUpdate = Partial<Omit<Role, 'id' | 'createdAt' | 'updatedAt'>>;
