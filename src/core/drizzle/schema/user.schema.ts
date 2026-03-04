import { table } from 'console';
import {
  pgSchema,
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const userSchema = pgSchema('users');

export const userTable = userSchema.table(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    isActive: boolean('is_active').notNull().default(false),
    deleted: boolean('deleted').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      emailUnique: uniqueIndex('users_email_unique').on(table.email),
      emailIndex: index('users_email_index').on(table.email),
      activeIndex: index('users_active_index').on(table.isActive),
    };
  },
);

export const userCredentiaslTable = userSchema.table('user_credentials', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
},
(table) => {
  return {
      userIdUnique: uniqueIndex('user_credentials_user_id_unique').on(table.userId),
  }
}
);
