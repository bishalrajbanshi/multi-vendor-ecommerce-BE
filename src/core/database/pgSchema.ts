export const pgSchemaList = ['auth', 'customer','geography','vendor','workflow'] as const;
export type PgSchema = (typeof pgSchemaList)[number];
