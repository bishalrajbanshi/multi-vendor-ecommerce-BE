import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import { AuthRequest } from './auth.types';
import { passwordService } from 'src/core/utils/hash-passowrd.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: UserRepository,
    private readonly passwordService: passwordService,
  ) {}

  async signIn(payload: AuthRequest) {
    const user = await this.validateUser(payload.value);
    await this.validatePassword(payload.password, user.id);

    return user;
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
}
