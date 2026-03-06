import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { UserProfileService } from '../service/client.profile.service';
import { UpdateUserProfileDto } from '../dto/user.profile.update.dto';

@Controller('profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Patch(':id')
  async updateUserProfile(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() payload: UpdateUserProfileDto,
  ) {
    return {
      message: 'User profile updated successfully',
      data: await this.userProfileService.updateUserProfile(id, payload),
    };
  }

  @Get(':id')
  async getUserProfile(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return {
      message: 'User profile fetched successfully',
      data: await this.userProfileService.findUserProfile(id),
    };
  }
}
