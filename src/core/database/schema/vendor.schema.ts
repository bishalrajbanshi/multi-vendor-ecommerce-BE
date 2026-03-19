import {
  boolean,
  timestamp,
  uuid,
  varchar,
  pgSchema,
} from 'drizzle-orm/pg-core';
import { PgSchema } from '../pgSchema';
import { index } from 'drizzle-orm/pg-core';
import {
  BusinessStatus,
  BusinessType,
  BussinessApprovalStatus,
  DocumentType,
} from '../enums/enum';
import { zone } from './geograhpy.schema';

export const vendorSchema = pgSchema<PgSchema>('vendor');

export const vendorTable = vendorSchema.table('vendor', {
  id: uuid('id').primaryKey().defaultRandom(),

  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }).notNull().unique(),

  password: varchar('password', { length: 255 }).notNull(),
  isActive: boolean('is_active').notNull().default(true),

  zoneId: uuid('zone_id').references(() => zone.id, { onDelete: 'set null' }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const businessDetailsTable = vendorSchema.table('business_details', {
  id: uuid('id').primaryKey().defaultRandom(),
  vendorId: uuid('vendor_id')
    .notNull()
    .references(() => vendorTable.id),

  businessName: varchar('business_name', { length: 255 }).notNull(),
  legalName: varchar('legal_name', { length: 255 }).notNull(),
  businessType: varchar('business_type', { length: 100 })
    .notNull()
    .$type<BusinessType>(),

  registrationNumber: varchar('registration_number', { length: 100 }).notNull(),
  taxIdentificationNumber: varchar('tax_identification_number', {
    length: 100,
  }).notNull(),

  businessAddress: varchar('business_address', { length: 255 }).notNull(),
  zoneId: uuid('zone_id')
    .references(() => zone.id)
    .notNull(),

  businessEmail: varchar('business_email', { length: 255 }),
  businessPhone: varchar('business_phone', { length: 20 }),
  website: varchar('website', { length: 255 }),

  status: varchar('status', { length: 50 })
    .$type<BusinessStatus>()
    .notNull()
    .default(BusinessStatus.PENDING),

  isActive: boolean('is_active').notNull().default(false),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const bussinessKycTable = vendorSchema.table('business_kyc', {
  id: uuid('id').primaryKey().defaultRandom(),
  vendorId: uuid('vendor_id')
    .notNull()
    .references(() => vendorTable.id, { onDelete: 'cascade' }),

  documentType: varchar('document_type', { length: 100 }).notNull(),
  documentUrl: varchar('document_url', { length: 255 }).notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const documentVerificationTable = vendorSchema.table(
  'document_verification',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    businessKycId: uuid('business_kyc_id')
      .notNull()
      .references(() => bussinessKycTable.id, { onDelete: 'cascade' }),

    verificationStatus: varchar('verification_status', { length: 50 })
      .$type<BussinessApprovalStatus>()
      .notNull()
      .default(BussinessApprovalStatus.DRAFT),

    verifiedAt: timestamp('verified_at'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
);

export const identityVerificationTable = vendorSchema.table(
  'identity_verification',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    vendorId: uuid('vendor_id')
      .notNull()
      .references(() => vendorTable.id, { onDelete: 'cascade' }),
    documentNumber: varchar('document_number', { length: 100 }).notNull(),
      documentType: varchar('document_type', { length: 100 })
    .$type<DocumentType>()
    .notNull(),

    isVerified: boolean('is_verified').notNull().default(false),
    verifiedAt: timestamp('verified_at'),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),

  },
);


export const documentTable = vendorSchema.table('document', {
  id: uuid('id').primaryKey().defaultRandom(),
  identityVerificationId: uuid('identity_verification_id')
    .notNull()
    .references(() => identityVerificationTable.id, { onDelete: 'cascade' }),
  documentUrl: varchar('document_url', { length: 255 }).notNull(),
  frontDocumentUrl: varchar('front_document_url', { length: 255 }),
  backDocumentUrl: varchar('back_document_url', { length: 255 }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
