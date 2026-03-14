import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index';

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DrizzleService.name);
  public client!: ReturnType<typeof drizzle>;
  private pgSql!: ReturnType<typeof postgres>;

  async onModuleInit() {
    this.logger.log('Initializing Drizzle ORM...');
    const maxPoolSize = parseInt(process.env.DB_MAX_POOL || '20', 10);

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not set');
    }

    try {
      this.pgSql = postgres(databaseUrl, {
        max: maxPoolSize,
        ssl:
          process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : undefined,
        timeout: 0,
        idle_timeout: 30_000,
        onnotice: (notice) => this.logger.warn(`DB Notice: ${notice.message}`),
      });
      this.client = drizzle(this.pgSql, { schema });
      this.logger.log(
        `Drizzle ORM initialized successfully with pool size ${maxPoolSize}`,
      );
    } catch (error) {
      this.logger.error('Failed to initialize Drizzle ORM', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    if (this.pgSql) {
      this.logger.log('Closing Drizzle ORM connection...');
      try {
        await this.pgSql.end();
        this.logger.log('Drizzle ORM connection closed');
      } catch (error) {
        this.logger.error('Error while closing Drizzle ORM', error);
      }
    }
  }
}
