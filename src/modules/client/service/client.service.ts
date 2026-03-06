import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/client.repository';
import { CreateUserInput, UserUpdate } from '../user.type';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signupUser(payload: CreateUserInput) {
    const existUser = await this.userRepository.findByPhone(payload.phone);
    if (existUser) {
      throw new Error(`User with phone ${payload.phone} already exists`);
    }
    return this.userRepository.create(payload);
  }

  async updateUser(userId: string, payload: UserUpdate) {
    const existUser = await this.userRepository.findById(userId);
    if (!existUser) {
      throw new Error(`User with id ${userId} does not exist`);
    }
    return this.userRepository.update(userId, payload);
  }
}
