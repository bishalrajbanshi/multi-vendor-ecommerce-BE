export const pgSchemaList = ['auth', 'customer'] as const;
export type PgSchema = (typeof pgSchemaList)[number];
