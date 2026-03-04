import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.create.dto';
import { UpdateUserDto } from './dto/user.update.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signupUser(@Body() payload: CreateUserDto) {
    return {
      message: 'User created successfully',
      data: await this.userService.signupUser(payload),
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
