export const pgSchemaList = ['auth','user', 'customer','geography','vendor','approval','document', 'roleBaseAccess'] as const;
export type PgSchema = (typeof pgSchemaList)[number];
