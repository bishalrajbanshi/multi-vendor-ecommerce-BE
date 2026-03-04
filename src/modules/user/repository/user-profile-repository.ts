import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/core/drizzle/drizzle.service';
import { UserProfileUpdate, UserUpdate } from '../user.type';
import { userProfileTable } from 'src/core/drizzle/schema';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

@Injectable()
export class UserProfileRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async updateProfile(id: string, payload: UserProfileUpdate) {
    const [updatedProfile] = await this.drizzleService.client
      .update(userProfileTable)
      .set({
        fullName: payload.fullName,
        profile: payload.profile,
        dob: payload.dob,
        gender: payload.gender,
        updatedAt: new Date(),
      })
      .where(eq(userProfileTable.userId, id))
      .returning();
    return updatedProfile;
  }

  async findProfile(id: string) {
    const [profile] = await this.drizzleService.client
      .select()
      .from(userProfileTable)
      .where(eq(userProfileTable.userId, id));
    return profile;
  }
}
