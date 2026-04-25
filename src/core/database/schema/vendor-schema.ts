import {
  pgSchema,
  uuid,
  varchar,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

export const vendorSchema = pgSchema('vendor');

/**
 * vendor table for vendors
 */
export const vendorTable = vendorSchema.table(
  'vendors',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).unique(),
    phone: varchar('phone', { length: 20 }).unique(),

    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  },
  (table) => [], //pass valur for indexing
);
