import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserProfileController } from './controllers/user.profile.controller';
import { UserService } from './service/client.service';
import { UserProfileService } from './service/client.profile.service';
import { UserRepository } from './repository/client.repository';
import { ClientDeviceRepository } from './repository/client.device.repository';
import { UserProfileRepository } from './repository/client.profile.repository';
import { CommonModule } from 'src/core/common/common.module';
import { DrizzleModule } from 'src/core/drizzle/drizzle.module';

@Module({
  imports: [CommonModule, DrizzleModule],
  controllers: [UserController, UserProfileController],
  providers: [
    UserService,
    UserProfileService,
    UserRepository,
    UserProfileRepository,
    ClientDeviceRepository,
  ],
  exports: [UserRepository, ClientDeviceRepository],
})
export class UserModule {}
