import { Module } from '@nestjs/common';
import { DrizzleService } from './drizzle.service';
import { GenericDrizzleRepository } from './generic.drizzle.repository';

@Module({
  providers: [GenericDrizzleRepository, DrizzleService],
})
export class DrizzleModule {}
