import { Module } from '@nestjs/common';
import { PasswordService } from './passowrd.service';
import { DrizzleModule } from '../database/drizzle.module';
import { GenerateResponseMessage } from '../helper/generateResponseMessage';

@Module({
  imports: [DrizzleModule],
  providers: [PasswordService, GenerateResponseMessage],
  exports: [PasswordService, GenerateResponseMessage],
})
export class CommonModule {}
