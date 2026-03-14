import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { UpdateUserProfileDto } from '../dto/user.profile.update.dto';
import { CustomerProfileService } from '../service/customer.profile.service';

@Controller('profile')
export class CustomerProfileController {
  constructor(
    private readonly customerProfileService: CustomerProfileService,
  ) {}

  @Patch(':id')
  async updateUserProfile(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() payload: UpdateUserProfileDto,
  ) {
    return {
      message: 'User profile updated successfully',
      data: await this.customerProfileService.updateUserProfile(id, payload),
    };
  }

  @Get(':id')
  async getUserProfile(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return {
      message: 'User profile fetched successfully',
      data: await this.customerProfileService.findUserProfile(id),
    };
  }
}
