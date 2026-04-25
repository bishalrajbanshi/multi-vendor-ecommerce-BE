import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfigs } from './core/config/app.config';
import { DrizzleModule } from './core/database/drizzle.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './core/common/common.module';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot(appConfigs),
    DrizzleModule,
    CommonModule,
    CustomerModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
