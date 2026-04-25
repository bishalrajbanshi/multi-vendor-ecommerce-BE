import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './services/auth.service';
import { GoogleAuthGuard } from './guards/google.guards';
import { User } from './decorator/user.decortor';
import { GoogleAuthDto } from './dto/google.auth.dto';
import { GenerateResponseMessage } from 'src/core/helper/generateResponseMessage';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly generateResponse: GenerateResponseMessage,
  ) {}

  @Post()
  async signIn(@Req() request: Request, @Body() payload: LoginDto) {
    return this.authService.signIn(request, payload);
  }

  @Post('superadmin')
  async signInSuperAdmin(@Body() payload: LoginDto) {
    return {
      data: await this.authService.signInSuperAdmin(payload),
      message: this.generateResponse.generateSuccessMessage(
        'Super Admin Login Successfully',
      ),
    };
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
  googleCallback(@User() customer: GoogleAuthDto) {
    console.log('Google OAuth callback user:', customer);
  }
}
