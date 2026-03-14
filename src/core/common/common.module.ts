import { Module } from '@nestjs/common';
import { PasswordService } from './passowrd.service';
import { DrizzleModule } from '../database/drizzle.module';

@Module({
  imports: [DrizzleModule],
  providers: [PasswordService],
  exports: [PasswordService],
})
export class CommonModule {}
