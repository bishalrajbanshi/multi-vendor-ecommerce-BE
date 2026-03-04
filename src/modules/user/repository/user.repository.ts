import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/core/drizzle/drizzle.service';
import { passwordService } from 'src/core/utils/hash-passowrd.service';
import { CreateUserInput, UserUpdate } from '../user.type';
import {
  GenderEnum,
  userCredentiaslTable,
  userProfileTable,
  userTable,
} from 'src/core/drizzle/schema';
import { eq, or } from 'drizzle-orm';

@Injectable()
export class UserRepository {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly hashService: passwordService,
  ) {}

  async create(payload: CreateUserInput) {
    const hashedPassword = await this.hashService.hashPassword(
      payload.password,
    );

    return this.drizzleService.client.transaction(async (tx) => {
      const [user] = await tx
        .insert(userTable)
        .values({
          email: payload.email,
          phone: payload.phone,
        })
        .returning();

      await tx.insert(userCredentiaslTable).values({
        userId: user.id,
        passwordHash: hashedPassword,
      });

      await tx.insert(userProfileTable).values({
        userId: user.id,
        fullName: payload.fullName,
        profile: payload.profile || null,
        dob: payload.dob || null,
        gender: payload.gender,
      });
    });
  }

  async update(userId: string, payload: UserUpdate) {
    const [updatedUser] = await this.drizzleService.client
      .update(userTable)
      .set({
        ...payload,
        updatedAt: new Date(),
      })
      .where(eq(userTable.id, userId))
      .returning();

    return updatedUser || null;
  }

  async findByEmail(email: string) {
    const [record] = await this.drizzleService.client
      .select()
      .from(userTable)
      .where(eq(userTable.email, email))
      .limit(1);
    return record || null;
  }

  async findById(id: string) {
    const [record] = await this.drizzleService.client
      .select()
      .from(userTable)
      .where(eq(userTable.id, id))
      .limit(1);
    return record || null;
  }

  async findUser(email: string, phone: string) {
    const [record] = await this.drizzleService.client
      .select()
      .from(userTable)
      .where(or(eq(userTable.email, email), eq(userTable.phone, phone)))
      .limit(1);
    return record || null;
  }

  async findByPhone(phone: string) {
    const [record] = await this.drizzleService.client
      .select()
      .from(userTable)
      .where(eq(userTable.phone, phone))
      .leftJoin(userProfileTable, eq(userProfileTable.userId, userTable.id))
      .limit(1);
    return record || null;
  }
}
