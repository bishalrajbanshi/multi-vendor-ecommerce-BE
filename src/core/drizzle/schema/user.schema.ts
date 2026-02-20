import { pgSchema } from 'drizzle-orm/pg-core';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const userSchema = pgSchema('users');

export const userTable = userSchema.table('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 6 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
});
