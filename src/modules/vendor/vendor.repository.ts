import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/core/database/drizzle.service';
import { CreateVendorInput } from './vendor.type';
import { PasswordService } from 'src/core/common/passowrd.service';
import { vendorTable } from 'src/core/database/schema/vendor.schema';

@Injectable()
export class VendorRepository {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly hashService: PasswordService,
  ) {}

  async createVendor(payload: CreateVendorInput) {
    const hashedPassword = await this.hashService.hashPassword(
      payload.password,
    );
    const [record] = await this.drizzleService.client
      .insert(vendorTable)
      .values({
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        password: hashedPassword,
      })
      .returning();

    return record || null;
  }
}
