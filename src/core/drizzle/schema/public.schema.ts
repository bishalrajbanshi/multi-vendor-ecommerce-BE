import { pgTable } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';

/**
 * public schema tables 
 */
export const otpTable = pgTable('otp', {
  id: uuid('id').primaryKey().defaultRandom(),
  user: uuid('user').notNull(),
  code: uuid('code').notNull(),
});
