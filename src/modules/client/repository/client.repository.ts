import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/core/drizzle/drizzle.service';
import { PasswordService } from 'src/core/common/passowrd.service';
import { CreateUserInput, UserUpdate } from '../user.type';
import {
  clientCredentialsTable,
  clientProfileTable,
  clientTable,
} from 'src/core/drizzle/schema';
import { and, eq, or } from 'drizzle-orm';
import { GoogleSignInRequest } from 'src/modules/auth/types/auth.types';
@Injectable()
export class UserRepository {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly hashService: PasswordService,
  ) {}

  async findCredential(userId: string) {
    const [record] = await this.drizzleService.client
      .select()
      .from(clientCredentialsTable)
      .where(eq(clientCredentialsTable.clientId, userId))
      .limit(1);
    return record || null;
  }

  async create(payload: CreateUserInput) {
    const [record] = await this.drizzleService.client
      .insert(clientTable)
      .values({
        phone: payload.phone,
      })
      .returning();

    return record || null;
  }

  async update(userId: string, payload: UserUpdate) {
    const [updatedUser] = await this.drizzleService.client
      .update(clientTable)
      .set({
        ...payload,
        updatedAt: new Date(),
      })
      .where(eq(clientTable.id, userId))
      .returning();

    return updatedUser || null;
  }

  async findByEmail(email: string) {
    const [record] = await this.drizzleService.client
      .select()
      .from(clientTable)
      .where(eq(clientTable.email, email))
      .limit(1);
    return record || null;
  }

  async findById(id: string) {
    const [record] = await this.drizzleService.client
      .select()
      .from(clientTable)
      .where(eq(clientTable.id, id))
      .limit(1);
    return record || null;
  }

  async findUser(value: string) {
    const [record] = await this.drizzleService.client
      .select()
      .from(clientTable)
      .where(or(eq(clientTable.email, value), eq(clientTable.phone, value)))
      .limit(1);
    return record || null;
  }

  async findByEmailOrPhone(email: string, phone: string) {
    const [record] = await this.drizzleService.client
      .select()
      .from(clientTable)
      .where(or(eq(clientTable.email, email), eq(clientTable.phone, phone)))
      .limit(1);
    return record || null;
  }

  async findByPhone(phone: string) {
    const [record] = await this.drizzleService.client
      .select()
      .from(clientTable)
      .where(eq(clientTable.phone, phone))
      .leftJoin(
        clientProfileTable,
        eq(clientProfileTable.clientId, clientTable.id),
      )
      .limit(1);
    return record || null;
  }

  async findByGoogleAndEmail(googleId: string, email: string) {
    const [record] = await this.drizzleService.client
      .select()
      .from(clientTable)
      .where(
        and(eq(clientTable.googleId, googleId), eq(clientTable.email, email)),
      )
      .limit(1);
    return record || null;
  }

  async googleSignUp(payload: GoogleSignInRequest) {
    return await this.drizzleService.client.transaction(async (tx) => {
      const [user] = await tx
        .insert(clientTable)
        .values({
          email: payload.email,
          googleId: payload.googleId,
        })
        .returning();

      await tx.insert(clientProfileTable).values({
        clientId: user.id,
        fullName: payload.name,
        profile: payload.avatar,
      });
    });
  }

  async linkGoogleAccount(userId: string, googleId: string) {
    return await this.drizzleService.client.transaction(async (tx) => {
      await tx
        .update(clientCredentialsTable)
        .set({
          passwordHash: null,
          updatedAt: new Date(),
        })
        .where(eq(clientCredentialsTable.clientId, userId));
    });
  }
}
