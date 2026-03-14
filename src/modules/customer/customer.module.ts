import { Module } from '@nestjs/common';
import { ClientDeviceRepository } from './repository/customer.device.repository';
import { CommonModule } from 'src/core/common/common.module';
import { DrizzleModule } from 'src/core/database/drizzle.module';
import { CustomerRepository } from './repository/customer.repository';
import { CustomerProfileRepository } from './repository/customer.profile.repository';
import { CustomerService } from './service/customer.service';
import { CustomerProfileService } from './service/customer.profile.service';
import { CustomerController } from './controllers/customer.controller';
import { CustomerProfileController } from './controllers/customer.profile.controller';

@Module({
  imports: [CommonModule, DrizzleModule],
  controllers: [CustomerController, CustomerProfileController],
  providers: [
    CustomerRepository,
    CustomerProfileRepository,
    CustomerService,
    CustomerProfileService,
    ClientDeviceRepository,
  ],
  exports: [CustomerRepository,ClientDeviceRepository],
})
export class CustomerModule {}
