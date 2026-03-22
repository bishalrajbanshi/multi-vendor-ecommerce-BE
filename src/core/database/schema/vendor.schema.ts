import {
  boolean,
  timestamp,
  uuid,
  varchar,
  pgSchema,
} from 'drizzle-orm/pg-core';
import { PgSchema } from '../pgSchema';
import {
  BusinessStatus,
  BusinessType,
} from '../enums/enum';

export const vendorSchema = pgSchema<PgSchema>('vendor');

export const vendorTable = vendorSchema.table('vendors', {
  id: uuid('id').primaryKey().defaultRandom(),

  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }).notNull().unique(),

  password: varchar('password', { length: 255 }).notNull(),

  isActive: boolean('is_active').default(true),
  isEmailVerified: boolean('is_email_verified').default(false),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const vendorBusinessTable = vendorSchema.table('vendor_businesses', {
  id: uuid('id').primaryKey().defaultRandom(),

  vendorId: uuid('vendor_id')
    .notNull()
    .references(() => vendorTable.id, { onDelete: 'cascade' }),

  businessName: varchar('business_name', { length: 255 }).notNull(),
  legalName: varchar('legal_name', { length: 255 }).notNull(),

  businessType: varchar('business_type', { length: 100 })
    .$type<BusinessType>()
    .notNull(),

  registrationNumber: varchar('registration_number', { length: 100 }).notNull(),
  taxNumber: varchar('tax_number', { length: 100 }).notNull(),

  status: varchar('status', { length: 50 })
    .$type<BusinessStatus>()
    .default(BusinessStatus.PENDING),

  isActive: boolean('is_active').default(false),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});


export const businessAddressTable = vendorSchema.table('business_addresses', {
  id: uuid('id').primaryKey().defaultRandom(),

  businessId: uuid('business_id')
    .notNull()
    .references(() => vendorBusinessTable.id, { onDelete: 'cascade' }),

  address: varchar('address', { length: 255 }).notNull(),
  zoneId: varchar('zone_id', { length: 100 }).notNull(),

  isPrimary: boolean('is_primary').default(true),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});