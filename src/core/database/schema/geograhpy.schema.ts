import {
  boolean,
  timestamp,
  uuid,
  varchar,
  pgSchema,
} from 'drizzle-orm/pg-core';
import { PgSchema } from '../pgSchema';
import { index } from 'drizzle-orm/pg-core';

export const geographySchema = pgSchema<PgSchema>('geography');

export const countryTable = geographySchema.table(
  'country',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    code: varchar('code', { length: 10 }).notNull().unique(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [index('country_name_index').on(table.name)],
);

export const stateTable = geographySchema.table(
  'state',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    code: varchar('code', { length: 10 }).notNull(),
    countryId: uuid('country_id')
      .references(() => countryTable.id, { onDelete: 'cascade' })
      .notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [index('state_name_index').on(table.name)],
);

export const cityTable = geographySchema.table(
  'city',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    stateId: uuid('state_id')
      .references(() => stateTable.id, { onDelete: 'cascade' })
      .notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [index('city_name_index').on(table.name)],
);

export const zone = geographySchema.table(
  'zone',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    cityId: uuid('city_id')
      .references(() => cityTable.id, { onDelete: 'cascade' })
      .notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    code: varchar('code', { length: 10 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [index('zone_name_index').on(table.name)],
);
