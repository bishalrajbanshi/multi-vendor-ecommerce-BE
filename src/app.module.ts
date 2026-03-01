import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfigs } from './core/config/app.config';
import { DrizzleModule } from './core/drizzle/drizzle.module';
import { RoleModule } from './modules/role-base-access-control/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot(appConfigs),
    DrizzleModule,
    RoleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
