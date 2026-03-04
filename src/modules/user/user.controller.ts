import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './service/user.service';
import { CreateUserDto } from './dto/user.create.dto';
import { UpdateUserDto } from './dto/user.update.dto';
import { UpdateUserProfileDto } from './dto/user.profile.update.dto';
import { UserProfileService } from './service/user.profile.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userProfileService: UserProfileService,
  ) {}

  @Post('/signup')
  async signupUser(@Body() payload: CreateUserDto) {
    return {
      message: 'User created successfully',
      data: await this.userService.signupUser(payload),
    };
  }

  @Patch('/profile/:id')
  async updateUserProfile(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() payload: UpdateUserProfileDto,
  ) {
    return {
      message: 'User profile updated successfully',
      data: await this.userProfileService.updateUserProfile(id, payload),
    };
  }

  @Patch('/:id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() payload: UpdateUserDto,
  ) {
    return {
      message: 'User updated successfully',
      data: await this.userService.updateUser(id, payload),
    };
  }
}
