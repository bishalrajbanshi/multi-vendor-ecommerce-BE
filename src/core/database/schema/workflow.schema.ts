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
  currentApprovalStatus,
} from '../enums/enum';
import { zone } from './geograhpy.schema';

export const workflowSchema = pgSchema<PgSchema>('workflow');

export const approvalWorkflow = workflowSchema.table('approvalWorkflow', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 500 }),

  status: varchar('status', { length: 50 })
    .notNull()
    .$type<BussinessApprovalStatus>()
    .default(BussinessApprovalStatus.DRAFT),

  currentStatus: varchar('current_status', { length: 50 })
    .notNull()
    .$type<currentApprovalStatus>(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
