import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './services/auth.service';
import { GoogleAuthGuard } from './guards/google.guards';
import { User } from './decorator/user.decortor';
import { GoogleAuthDto } from './dto/google.auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signIn(@Req() request: Request, @Body() payload: LoginDto) {
    return this.authService.signIn(request, payload);
  }

  /**
   * Step 1: Redirect user to Google login
   */
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    // This route will redirect to Google login page automatically
  }

  /**
   * Step 2: Google OAuth callback
   */
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleCallback(@User() customer:GoogleAuthDto) {
    console.log('Google OAuth callback user:', customer);
  }
}
