import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/core/database/drizzle.service';
import { eq } from 'drizzle-orm/sql/expressions/conditions';
import { customerProfileTable } from 'src/core/database/schema';
import { CustomerProfileUpdate } from '../customer.type';

@Injectable()
export class CustomerProfileRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async updateProfile(id: string, payload: CustomerProfileUpdate) {
    const [updatedProfile] = await this.drizzleService.client
      .update(customerProfileTable)
      .set({
        fullName: payload.fullName,
        profile: payload.profile,
        dateOfBirth: payload.dob,
        gender: payload.gender,
        updatedAt: new Date(),
      })
      .where(eq(customerProfileTable.customerId, id))
      .returning();
    return updatedProfile;
  }

  async findProfile(id: string) {
    const [profile] = await this.drizzleService.client
      .select()
      .from(customerProfileTable)
      .where(eq(customerProfileTable.customerId, id));
    return profile;
  }
}
