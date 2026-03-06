import { Body, Controller, Post, Req } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

  @Post()
  async signIn(@Req() Request, @Body() payload: LoginDto) {
    return this.authService.signIn(Request,payload);
  }

}
