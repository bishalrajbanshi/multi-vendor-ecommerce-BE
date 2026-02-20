import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index';
import { pgSchemaList } from './pgSchema';

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private logger = new Logger(DrizzleService.name);
  public client!: ReturnType<typeof drizzle>;
  private pgSql!: ReturnType<typeof postgres>;

  async onModuleInit() {
    try {

      this.logger.log('Initializing Drizzle ORM...');
      this.pgSql = postgres(process.env.DATABASE_URL!, {
        max: 10,
        ssl:
          process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : undefined,
      });
      this.client = drizzle(this.pgSql, { schema });
      this.logger.log('Drizzle ORM initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize Drizzle ORM', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    if (this.pgSql) {
      this.logger.log('Closing Drizzle ORM connection...');
      await this.pgSql.end();
      this.logger.log('Drizzle ORM connection closed');
    }
  }
}
