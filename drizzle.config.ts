import type { Config } from 'drizzle-kit';

export default {
  schema: './src/core/drizzle/schema/index.ts',
  out: './src/core/drizzle/migrations',
  casing:'camelCase',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
