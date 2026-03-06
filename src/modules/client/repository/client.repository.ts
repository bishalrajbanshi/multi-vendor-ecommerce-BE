import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/core/drizzle/drizzle.service';
import { passwordService } from 'src/core/common/passowrd.service';
import { CreateUserInput, UserUpdate } from '../user.type';
import {
  clientCredentialsTable,
  clientProfileTable,
  clientTable,
} from 'src/core/drizzle/schema';
import { eq, or } from 'drizzle-orm';
@Injectable()
export class UserRepository {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly hashService: passwordService,
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
}
