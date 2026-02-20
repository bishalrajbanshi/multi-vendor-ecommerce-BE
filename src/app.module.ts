import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfigs } from './core/config/app.config';
import { DrizzleModule } from './core/drizzle/drizzle.module';

@Module({
  imports: [
    ConfigModule.forRoot(appConfigs),
    DrizzleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
