export const pgSchemaList = ['auth', 'customer','geography','vendor','workflow','document'] as const;
export type PgSchema = (typeof pgSchemaList)[number];
