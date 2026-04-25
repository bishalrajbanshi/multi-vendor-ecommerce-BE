import {
  pgSchema,
  uuid,
  varchar,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

import { PgSchema } from '../pgSchema';

export const userSchema = pgSchema<PgSchema>('user');

/**
 * user table
 */
export const user = userSchema.table(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    email: varchar('email', { length: 255 }).unique(),
    phone: varchar('phone', { length: 20 }).unique(),

    isGoogleAuth: boolean('isGoogleAuth').notNull().default(false),

    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  },
  (table) => [], //pass valur for indexing
);

/**
 * google auth table for users if login with google
 */

export const userGoogleAuth = userSchema.table('googleAuth', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  googleId: varchar('googleId', { length: 255 }).notNull().unique(),
});

/**
 * auth credentials table for users
 */
export const userAuthCredential = userSchema.table('authCredentials', {
  id: uuid('id').primaryKey().defaultRandom(),

  userId: uuid('userId')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  password: varchar('password', { length: 255 }),

  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});
