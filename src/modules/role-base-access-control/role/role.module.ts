import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { DrizzleModule } from 'src/core/drizzle/drizzle.module';
import { DrizzleService } from 'src/core/drizzle/drizzle.service';

@Module({
  providers: [DrizzleService,RoleRepository,RoleService],
  controllers: [RoleController]
})
export class RoleModule {}
