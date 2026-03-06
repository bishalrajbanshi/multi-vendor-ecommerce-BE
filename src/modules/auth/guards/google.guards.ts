import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  private readonly logger = new Logger(GoogleAuthGuard.name);

  /**
   * Handles the result of the Google OAuth authentication
   */
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err) {
      this.logger.error('Google OAuth error', err);
      throw new UnauthorizedException('Authentication error');
    }

    if (!user) {
      this.logger.warn('Google OAuth failed', info);
      throw new UnauthorizedException('Google authentication failed');
    }

    // Optional: attach extra info to user for logging/debugging
    if (info) {
      this.logger.debug('Google OAuth info', JSON.stringify(info));
    }

    return user;
  }
}