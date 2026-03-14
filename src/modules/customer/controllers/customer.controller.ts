import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/user.create.dto';
import { UpdateUserDto } from '../dto/user.update.dto';
import { CustomerService } from '../service/customer.service';

@Controller('user')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
  ) {}

  @Post('/signup')
  async signupUser(@Body() payload: CreateUserDto) {
    return {
      message: 'User created successfully',
      data: await this.customerService.signupUser(payload),
    };
  }
  @Patch('/:id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() payload: UpdateUserDto,
  ) {
    return {
      message: 'User updated successfully',
      data: await this.customerService.updateUser(id, payload),
    };
  }
}
