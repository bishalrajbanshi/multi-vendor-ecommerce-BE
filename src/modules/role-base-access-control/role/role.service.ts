import { BadRequestException, Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { RoleInsert } from './role.type';
import { paginate } from 'src/utils/pagination.utils';

@Injectable()
export class RoleService {
  constructor(private readonly repository: RoleRepository) {}

  async createService(payload: RoleInsert) {
    return await this.repository.create(payload);
  }

  async findOneService(id: string) {
    const role = await this.repository.findOne(id);
    if (!role) {
      throw new BadRequestException(`Role with ${id} not found`);
    }
    return role;
  }

  async updateService(id: string, payload: RoleInsert) {
    const role = await this.repository.findOne(id);
    if (!role) {
      throw new BadRequestException(`Role with ${id} not found`);
    }
    return await this.repository.update(id, payload);
  }

  async deleteService(id: string) {
    const role = await this.repository.findOne(id);
    if (!role) {
      throw new BadRequestException(`Role with ${id} not found`);
    }
    return await this.repository.deleteOne(id);
  }

  async findAllService(
    search?: string,
    page = 1,
    limit = 10
  ) {
    const [data, totalRecords] = await this.repository.findMany(search, page, limit);
    return paginate(data, page, limit, totalRecords);
  }
}
