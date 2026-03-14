import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/core/database/drizzle.service';
import { PasswordService } from 'src/core/common/passowrd.service';
import {
  authCredentialTable,
  customerProfileTable,
  customerTable,
  googleAuthTable,
} from 'src/core/database/schema';
import { and, eq, or } from 'drizzle-orm';
import { GoogleSignInRequest } from 'src/modules/auth/types/auth.types';
import { CreateCustomerInput, CustomerUpdate } from '../customer.type';
@Injectable()
export class CustomerRepository {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly hashService: PasswordService,
  ) {}

  async findCredential(customerId: string) {
    const [record] = await this.drizzleService.client
      .select()
      .from(authCredentialTable)
      .where(eq(authCredentialTable.customerId, customerId))
      .limit(1);
    return record || null;
  }

  async create(payload: CreateCustomerInput) {
    const [record] = await this.drizzleService.client
      .insert(customerTable)
      .values({
        phone: payload.phone,
      })
      .returning();

    return record || null;
  }

  async update(customerId: string, payload: CustomerUpdate) {
    const [updatedUser] = await this.drizzleService.client
      .update(customerTable)
      .set({
        ...payload,
        updatedAt: new Date(),
      })
      .where(eq(customerTable.id, customerId))
      .returning();

    return updatedUser || null;
  }

  async findByEmail(email: string) {
    const [record] = await this.drizzleService.client
      .select()
      .from(customerTable)
      .where(eq(customerTable.email, email))
      .limit(1);
    return record || null;
  }

  async findById(id: string) {
    const [record] = await this.drizzleService.client
      .select()
      .from(customerTable)
      .where(eq(customerTable.id, id))
      .limit(1);
    return record || null;
  }

  async findUser(value: string) {
    const [record] = await this.drizzleService.client
      .select()
      .from(customerTable)
      .where(or(eq(customerTable.email, value), eq(customerTable.phone, value)))
      .limit(1);
    return record || null;
  }

  async findByEmailOrPhone(email: string, phone: string) {
    const [record] = await this.drizzleService.client
      .select()
      .from(customerTable)
      .where(or(eq(customerTable.email, email), eq(customerTable.phone, phone)))
      .limit(1);
    return record || null;
  }

  async findByPhone(phone: string) {
    const [record] = await this.drizzleService.client
      .select()
      .from(customerTable)
      .where(eq(customerTable.phone, phone))
      .leftJoin(
        customerProfileTable,
        eq(customerProfileTable.customerId, customerTable.id),
      )
      .limit(1);
    return record || null;
  }

  async findByGoogleAndEmail(googleId: string, email: string) {
    const [record] = await this.drizzleService.client
      .select()
      .from(customerTable)
      .where(
        and(
          eq(customerTable.isGoogleAuth, true),
          eq(customerTable.email, email),
        ),
      )
      .limit(1);
    return record || null;
  }

  async googleSignUp(payload: GoogleSignInRequest) {
    return await this.drizzleService.client.transaction(async (tx) => {
      const [user] = await tx
        .insert(customerTable)
        .values({
          email: payload.email,
          isGoogleAuth: true,
        })
        .returning();

      await tx.insert(googleAuthTable).values({
        customerId: user.id,
        googleId: payload.googleId,
      });

      await tx.insert(customerProfileTable).values({
        customerId: user.id,
        fullName: payload.name,
        profile: payload.avatar,
      });
    });
  }

  async linkGoogleAccount(userId: string, googleId: string) {
    return await this.drizzleService.client.transaction(async (tx) => {
      await tx
        .update(authCredentialTable)
        .set({
          passwordHash: null,
          updatedAt: new Date(),
        })
        .where(eq(authCredentialTable.customerId, userId));
    });
  }
}
