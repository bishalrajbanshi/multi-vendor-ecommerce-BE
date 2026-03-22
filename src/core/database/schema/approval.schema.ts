import {
  timestamp,
  uuid,
  varchar,
  pgSchema,
} from 'drizzle-orm/pg-core';
import { PgSchema } from '../pgSchema';
import {
  BusinessType,
  BussinessApprovalStatus,
  currentApprovalStatus,
} from '../enums/enum';
import { vendorTable } from './vendor.schema';


export const approvalSchema = pgSchema<PgSchema>('approval');

export const documentRegistry = approvalSchema.table('documentRegistry', {
  id: uuid('id').primaryKey().defaultRandom(),
  vendorId: uuid('vendor_id')
    .references(() => vendorTable.id, { onDelete: 'cascade' })
    .notNull(),
  bussinessType:varchar('bussiness_type', { length: 100 }).$type<BusinessType>().notNull(),
  status: varchar('status', { length: 50 })
    .notNull()
    .$type<BussinessApprovalStatus>()
    .default(BussinessApprovalStatus.DRAFT),
  currentStatus: varchar('current_status', { length: 50 })
    .notNull()
    .$type<currentApprovalStatus>(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
},

);
