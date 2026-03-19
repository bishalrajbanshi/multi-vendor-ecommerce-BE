import { pgSchema } from 'drizzle-orm/pg-core';
import { Role } from '../enums/default.role.enum';
import { Gender } from '../enums/gender.enums';
import { boolean, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { PgSchema } from '../pgSchema';
import { index } from 'drizzle-orm/pg-core';

// =============================
// user schema
// =============================

export const customerSchema = pgSchema<PgSchema>('customer');

// =============================
// USERS
// =============================
export const customerTable = customerSchema.table(
  'customer',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    email: varchar('email', { length: 255 }).unique(),
    phone: varchar('phone', { length: 20 }).unique(),

    isGoogleAuth: boolean('is_google_auth').notNull().default(false),

    role: varchar('role', { length: 50 })
      .notNull()
      .default(Role.CUSTOMER)
      .$type<Role>(),
    isActive: boolean('status').notNull().default(true),

    deleted: boolean('deleted').notNull().default(false),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    index('email_index').on(table.email),
    index('phone_index').on(table.phone),
  ],
);

// =============================
// AUTH CREDENTIALS
// =============================

export const authCredentialTable = customerSchema.table('auth_credentials', {
  id: uuid('id').primaryKey().defaultRandom(),

  customerId: uuid('customer_id')
    .references(() => customerTable.id, { onDelete: 'cascade' })
    .notNull().unique(),

  passwordHash: varchar('password_hash', { length: 255 }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// =============================
// GOOGLE AUTH
// =============================

export const googleAuthTable = customerSchema.table('google_auth', {
  id: uuid('id').primaryKey().defaultRandom(),

  customerId: uuid('customer_id')
    .notNull()
    .references(() => customerTable.id, { onDelete: 'cascade' }),

  googleId: varchar('google_id', { length: 255 }).notNull().unique(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// =============================
// USER PROFILE
// =============================

export const customerProfileTable = customerSchema.table('customer_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),

  customerId: uuid('customer_id')
    .notNull()
    .references(() => customerTable.id, { onDelete: 'cascade' }),

  fullName: varchar('full_name', { length: 255 }),
  profile: varchar('profile', { length: 255 }),

  dateOfBirth: timestamp('date_of_birth', { withTimezone: true }),

  gender: varchar('gender', { length: 50 }).$type<Gender>(),

  address: varchar('address', { length: 255 }),
  city: varchar('city', { length: 255 }),
  state: varchar('state', { length: 255 }),
  country: varchar('country', { length: 255 }),
  postalCode: varchar('postal_code', { length: 50 }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
