import { Injectable } from '@nestjs/common';
import { CustomerProfileUpdate } from '../customer.type';
import { CustomerProfileRepository } from '../repository/customer.profile.repository';

@Injectable()
export class CustomerProfileService {
  constructor(
    private readonly customerProfileRepository: CustomerProfileRepository,
  ) {}

  async updateUserProfile(id: string, payload: CustomerProfileUpdate) {
    return await this.customerProfileRepository.updateProfile(id, payload);
  }

  async findUserProfile(id: string) {
    const profile = await this.customerProfileRepository.findProfile(id);
    if (!profile) {
      throw new Error(`Profile with id ${id} does not exist`);
    }
    return profile;
  }
}
