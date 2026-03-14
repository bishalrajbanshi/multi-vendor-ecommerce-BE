import { Injectable } from '@nestjs/common';
import { RoleInsert, RoleUpdate } from './role.type';
import { DrizzleService } from 'src/core/database/drizzle.service';
import { roleTable } from 'src/core/database/schema';
import { eq, like, and } from 'drizzle-orm';
@Injectable()
export class RoleRepository {
  constructor(private readonly drizzle: DrizzleService) {}
  async create(payload: RoleInsert) {
    const [role] = await this.drizzle.client
      .insert(roleTable)
      .values(payload)
      .returning();
    return role;
  }

  async update(id: string, payload: RoleUpdate) {
    const [role] = await this.drizzle.client
      .update(roleTable)
      .set(payload)
      .where(eq(roleTable.id, id))
      .returning();
    return role || null;
  }

  async findOne(id: string) {
    const [role] = await this.drizzle.client
      .select()
      .from(roleTable)
      .where(eq(roleTable.id, id));
    return role || null;
  }

  async deleteOne(id: string) {
    const [role] = await this.drizzle.client
      .update(roleTable)
      .set({ deleted: true })
      .where(eq(roleTable.id, id))
      .returning();
    return role || null;
  }

  async findMany(params: { search?: string; page: number; perPage: number }) {
    const query = await this.drizzle.client
      .select()
      .from(roleTable)
      .where(
        and(
          params.search
            ? like(roleTable.name, `%${params.search}%`)
            : undefined,
          eq(roleTable.deleted, false),
        ),
      )
      .limit(params.perPage)
      .offset((params.page - 1) * params.perPage);
    return query;
  }
}
