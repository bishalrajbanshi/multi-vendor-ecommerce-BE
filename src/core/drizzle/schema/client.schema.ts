import { relations } from 'drizzle-orm';
import {
  pgSchema,
  uuid,
  varchar,
  boolean,
  timestamp,
  index,
  uniqueIndex,
  pgEnum,
} from 'drizzle-orm/pg-core';

import { Gender } from 'src/modules/client/user.type';

// Enum for gender
export const GenderEnum = pgEnum('gender', Gender);

// Schema
export const userSchema = pgSchema('client');

// --- CLIENT TABLE ---
export const clientTable = userSchema.table(
  'clients',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }),
    phone: varchar('phone', { length: 20 }),
    isActive: boolean('is_active').notNull().default(false),
    deleted: boolean('deleted').notNull().default(false),
    isVerified: boolean('is_verified').notNull().default(false),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('client_email_unique').on(table.email),
    uniqueIndex('client_phone_unique').on(table.phone),
    index('client_active_index').on(table.isActive),
  ],
);

// --- CLIENT PROFILE ---
export const clientProfileTable = userSchema.table(
  'client_profiles',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    clientId: uuid('client_id')
      .notNull()
      .references(() => clientTable.id, { onDelete: 'cascade' }),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    profile: varchar('profile', { length: 255 }),
    dob: timestamp('dob', { withTimezone: true }),
    gender: GenderEnum('gender'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('client_profiles_client_id_unique').on(table.clientId),
    index('client_profiles_client_id_index').on(table.clientId),
  ],
);

// --- CLIENT CREDENTIALS ---
export const clientCredentialsTable = userSchema.table(
  'client_credentials',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    clientId: uuid('client_id')
      .notNull()
      .references(() => clientTable.id, { onDelete: 'cascade' }),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('client_credentials_client_id_unique').on(table.clientId),
    index('client_credentials_client_id_index').on(table.clientId),
  ],
);

// --- CLIENT DEVICES ---
export const clientDeviceTable = userSchema.table(
  'client_devices',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    clientId: uuid('client_id')
      .notNull()
      .references(() => clientTable.id, { onDelete: 'cascade' }),
    ipAddress: varchar('ip_address', { length: 45 }).notNull(),
    deviceType: varchar('device_type', { length: 50 }).notNull(),
    deviceModel: varchar('device_model', { length: 255 }),
    os: varchar('os', { length: 100 }),
    osVersion: varchar('os_version', { length: 100 }),
    browser: varchar('browser', { length: 100 }),
    browserVersion: varchar('browser_version', { length: 100 }),
    userAgent: varchar('user_agent', { length: 500 }),
    logInAt: timestamp('login_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('client_devices_client_id_index').on(table.clientId),
    index('client_devices_login_at_index').on(table.logInAt),
  ],
);

// --- GOOGLE OAUTH ---
export const googleOAuthTable = userSchema.table('google_oauth', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id')
    .notNull()
    .references(() => clientTable.id, { onDelete: 'cascade' }),
  googleId: varchar('google_id', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// --- RELATIONS ---
export const clientRelations = relations(clientTable, ({ one, many }) => ({
  profile: one(clientProfileTable, {
    fields: [clientTable.id],
    references: [clientProfileTable.clientId],
  }),
  credentials: one(clientCredentialsTable, {
    fields: [clientTable.id],
    references: [clientCredentialsTable.clientId],
  }),
  devices: many(clientDeviceTable),
  googleAccounts: many(googleOAuthTable),
}));
