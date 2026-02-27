import { BadRequestException, Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { RoleInsert } from './role.type';

@Injectable()
export class RoleService {
  constructor(private readonly repository: RoleRepository) {}

  async createService(payload: RoleInsert) {
    return await this.repository.create(payload);
  }

  async updateService(id: string, payload: RoleInsert) {
    const role = await this.repository.findOne(id);
    if (!role) {
      throw new BadRequestException(`Role with ${id} not found`);
    }
    return await this.repository.update(id, payload);
  }
}
