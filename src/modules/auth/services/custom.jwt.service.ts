import { Injectable } from '@nestjs/common';
import { CustomJwtPayload, StringValue } from '../types/interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateAccessJwtToken(payload: CustomJwtPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>(
        'jwt.ACCESS_EXPIRATION_TIME',
      ) as StringValue,
    });
  }

  generateRefreshJwtToken(payload: CustomJwtPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>(
        'jwt.REFRESH_EXPIRATION_TIME',
      ) as StringValue,
    });
  }
}
