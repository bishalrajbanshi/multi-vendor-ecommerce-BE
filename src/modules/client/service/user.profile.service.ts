import { Injectable } from '@nestjs/common';
import { UserProfileRepository } from '../repository/client.profile.repository';
import { UserProfileUpdate } from '../user.type';

@Injectable()
export class UserProfileService {
  constructor(private readonly userProfileRepository: UserProfileRepository) {}

  async updateUserProfile(id: string, payload: UserProfileUpdate) {
    return await this.userProfileRepository.updateProfile(id, payload);
  }

  async findUserProfile(id: string) {
    const profile = await this.userProfileRepository.findProfile(id);
    if (!profile) {
      throw new Error(`Profile with id ${id} does not exist`);
    }
    return profile;
  }
}
