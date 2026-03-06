import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../client/repository/client.repository';
import { AuthRequest } from '../types/auth.types';
import { passwordService } from 'src/core/common/passowrd.service';
import { JwtTokenService } from 'src/modules/auth/services/custom.jwt.service';
import { ClientDeviceService } from './client.device.service';
import { ClientdeviceInfo } from '../types/interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: UserRepository,
    private readonly passwordService: passwordService,
    private readonly jwtService: JwtTokenService,
    private readonly device: ClientDeviceService,
  ) {}

  async signIn(request, payload: AuthRequest) {
    const user = await this.validateUser(payload.value);
    await this.validatePassword(payload.password, user.id);

    const accessToken = await this.jwtService.generateAccessJwtToken({
      id: user.id,
      email: user.email,
    });

    const refreshToken = await this.jwtService.generateRefreshJwtToken({
      id: user.id,
      email: user.email,
    });

    const clientInfo = this.device.clientInfo(request);
    const devicePayload: ClientdeviceInfo = {
      clientId: user.id,
      ...clientInfo,
      ipAddress: clientInfo.ipAddress ?? null,
      loggedInAt: new Date(),
    };

    await this.device.clientDeviceInfoCreate(devicePayload);

    return { user, accessToken, refreshToken };
  }

  private async validateUser(value: string) {
    const user = await this.repository.findUser(value);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive || user.deleted) {
      throw new ForbiddenException('Account is inactive');
    }

    return user;
  }

  private async validatePassword(password: string, userId: string) {
    const credential = await this.repository.findCredential(userId);

    if (!credential) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await this.passwordService.comparePassword(
      password,
      credential.passwordHash,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async forgotPassword(value: string) {
    const user = await this.validateUser(value);

    // send otp to email or phone number
  }
}
