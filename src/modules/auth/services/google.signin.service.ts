import { Injectable } from '@nestjs/common';
import { GoogleSignInRequest } from '../types/auth.types';
import { UserRepository } from 'src/modules/client/repository/client.repository';
import { JwtTokenService } from './custom.jwt.service';

@Injectable()
export class GoogleSignInService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtTokenService,
  ) {}

  async signInWithGoogle(payload: GoogleSignInRequest) {
    const user = await this.userRepository.findByEmailandGoogleId(
      payload.email,
    );
    if (user) {
      const accessToken = await this.jwtService.generateAccessJwtToken({
        id: user.id,
      });
      const refreshToken = await this.jwtService.generateRefreshJwtToken({
        id: user.id,
      });
      return { user, accessToken, refreshToken };
    } else {
      // Create new user with Google ID
      const newUser = await this.userRepository.googleSignUp(payload);
      const accessToken = await this.jwtService.generateAccessJwtToken({
        id: newUser.id,
      });

      const refreshToken = await this.jwtService.generateRefreshJwtToken({
        id: newUser.id,
      });
      return { user: newUser, accessToken, refreshToken };
    }
  }

  private async linkGoogleAccount(email: string) {
    const user = await this.userRepository.findByEmail(email);
  }
}
