import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { CommonModule } from 'src/core/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
