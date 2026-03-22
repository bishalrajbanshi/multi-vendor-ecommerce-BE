import {
  boolean,
  timestamp,
  varchar,
  uuid,
  pgSchema,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

import { PgSchema } from '../pgSchema';
import { customerTable } from './customer.schema';

// =============================
// AUTH SCHEMA
// =============================
export const authSchema = pgSchema<PgSchema>('auth');

//otp table 
export const otpTable = authSchema.table('otps', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => customerTable.id, {
    onDelete: 'cascade',
  }),

  // can be vendor or customer according to the realations

  otpCode: varchar('otp_code', { length: 10 }).notNull(),

  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),

  isUsed: boolean('is_used').notNull().default(false),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// role table
export const roleTable = authSchema.table('roles', {
  id: uuid('id').primaryKey().defaultRandom(),

  name: varchar('name', { length: 100 }).notNull().unique(),

  description: varchar('description', { length: 255 }),

  isSystem: boolean('is_system').notNull().default(false),

  status: boolean('status').notNull().default(true),

  deleted: boolean('deleted').notNull().default(false),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// =============================
// PERMISSIONS
// resource + action pattern
// =============================

export const permissionTable = authSchema.table('permissions', {
  id: uuid('id').primaryKey().defaultRandom(),

  resource: varchar('resource', { length: 100 }).notNull(),

  action: varchar('action', { length: 100 }).notNull(),

  description: varchar('description', { length: 255 }),

  status: boolean('status').notNull().default(true),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// =============================
// ROLE PERMISSIONS
// =============================

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
