import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './service/client.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
