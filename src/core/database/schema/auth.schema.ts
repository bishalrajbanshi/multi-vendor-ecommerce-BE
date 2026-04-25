import {
  boolean,
  timestamp,
  varchar,
  uuid,
  pgSchema,
} from 'drizzle-orm/pg-core';

import { PgSchema } from '../pgSchema';
import { Role } from '../enums/role.enum';

export const authSchema = pgSchema<PgSchema>('auth');

/**
 * super user
 */
export const superAdmin = authSchema.table('superAdmins', {
  id: uuid('id').primaryKey().defaultRandom(),

  email: varchar('email', { length: 255 }).unique(),
  phone: varchar('phone', { length: 20 }).unique(),
  passWord: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 })
    .notNull()
    .$type<Role>()
    .default(Role.SUPERADMIN),

  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

/**
 * vendor table for vendors
 */
export const vendorTable = authSchema.table('vendors', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique(),
  phone: varchar('phone', { length: 20 }).unique(),

  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

/**
 * role and permission tables for RBAC
 */
export const roleTable = authSchema.table('roles', {
  id: uuid('id').primaryKey().defaultRandom(),

  name: varchar('name', { length: 100 }).notNull().unique(),
  description: varchar('description', { length: 255 }),
  isSystem: boolean('isSystem').notNull().default(false),
  status: boolean('status').notNull().default(true),

  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const permissionTable = authSchema.table('permissions', {
  id: uuid('id').primaryKey().defaultRandom(),

  resource: varchar('resource', { length: 100 }).notNull(),
  action: varchar('action', { length: 100 }).notNull(),
  description: varchar('description', { length: 255 }),
  status: boolean('status').notNull().default(true),

  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const rolePermissionTable = authSchema.table('role_permissions', {
  id: uuid('id').primaryKey().defaultRandom(),

  roleId: uuid('role_id')
    .notNull()
    .references(() => roleTable.id, { onDelete: 'cascade' }),

  permissionId: uuid('permission_id')
    .notNull()
    .references(() => permissionTable.id, { onDelete: 'cascade' }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
});
