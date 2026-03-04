import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserInput, UserUpdate } from './user.type';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signupUser(payload: CreateUserInput) {
    const existUser = await this.userRepository.findUser(
      payload.email,
      payload.phone,
    );
    if (existUser) {
      throw new Error(
        `User with email ${payload.email} or phone ${payload.phone} already exists`,
      );
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
