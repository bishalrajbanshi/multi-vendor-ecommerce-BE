import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService } from 'src/core/database/drizzle.service';
import { superAdmin } from 'src/core/database/schema';

@Injectable()
export class AuthRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findSuperAdmin(email: string) {
    return this.drizzleService.client
      .select()
      .from(superAdmin)
      .where(eq(superAdmin.email, email))
      .limit(1)
      .then((result) => result[0] || null);
  }
}
