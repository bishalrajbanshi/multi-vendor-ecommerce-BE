import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './services/auth.service';
import { GoogleAuthGuard } from './guards/google.guards';
import { User } from './decorator/user.decortor';
import { GoogleAuthDto } from './dto/google.auth.dto';
import { GoogleSignInService } from './services/google.signin.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleSignInService: GoogleSignInService,
  ) {}

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
    //redirect to Google login page automatically
  }

  /**
   * Step 2: Google OAuth callback
   */
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@User() user: GoogleAuthDto, @Res() res: Response) {
    const data = await this.googleSignInService.signInWithGoogle(user);
    return res.redirect(
      `${process.env.FRONTEND_URL}/auth/success?client=${data.user}&token=${data.accessToken}&refreshToken=${data.refreshToken}`,
    );
  }
}
