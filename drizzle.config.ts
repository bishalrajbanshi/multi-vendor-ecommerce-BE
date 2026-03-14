import type { Config } from 'drizzle-kit';

export default {
  schema: './src/core/database/schema/index.ts',
  out: './src/core/database/migrations',
  casing:'camelCase',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
