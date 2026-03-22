export const pgSchemaList = ['auth', 'customer','geography','vendor','approval','document'] as const;
export type PgSchema = (typeof pgSchemaList)[number];
