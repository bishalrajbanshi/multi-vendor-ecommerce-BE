import { Injectable } from '@nestjs/common';
import { Role, RoleInsert, RoleUpdate } from './role.type';
import { DrizzleService } from 'src/core/drizzle/drizzle.service';
import { roleTable } from 'src/core/drizzle/schema';
import { eq, like } from 'drizzle-orm';
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
      .where(eq(roleTable.id, id))
      .limit(1);
    return role || null;
  }

  async deleteOne(id:string){
    const [role] = await this.drizzle.client
    .delete(roleTable)
    .where(eq(roleTable.id, id))
    .returning();
    return role || null;
  }

  async findMany(
    search?: string,
    page = 1,
    limit = 10,
  ){
    const offset = (page - 1) * limit;
    let whereClause = undefined;
    if (search) {
      whereClause = like(roleTable.name, `%${search}%`);
    }
    const [totalRecordsResult] = await this.drizzle.client
      .select({ count: this.drizzle.client.fn.count(roleTable.id) })
      .from(roleTable)
      .where(whereClause);
    const totalRecords = totalRecordsResult?.count || 0;
    const query = this.drizzle.client
      .select()
      .from(roleTable)
      .limit(limit)
      .offset(offset);
    if (whereClause) {
      query.where(whereClause);
    }
    const roles = await query;
    return [roles, totalRecords];
  }

}
