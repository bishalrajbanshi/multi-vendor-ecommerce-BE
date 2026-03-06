import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { CommonModule } from 'src/core/common/common.module';
import { DrizzleModule } from 'src/core/drizzle/drizzle.module';
import { UserModule } from '../client/user.module';
import { JwtTokenService } from './services/custom.jwt.service';
import { ClientDeviceService } from './services/client.device.service';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [DrizzleModule, CommonModule, UserModule, JwtModule, PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtTokenService,
    ClientDeviceService,
    GoogleStrategy,
  ],
})
export class AuthModule {}
