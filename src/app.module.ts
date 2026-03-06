import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfigs } from './core/config/app.config';
import { DrizzleModule } from './core/drizzle/drizzle.module';
import { RoleModule } from './modules/role-base-access-control/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './core/common/common.module';
import { UserModule } from './modules/client/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(appConfigs),
    DrizzleModule,
    CommonModule,
    UserModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
