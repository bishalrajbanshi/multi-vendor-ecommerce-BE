import { Injectable } from '@nestjs/common';
import { GoogleSignInRequest } from '../types/auth.types';
import { UserRepository } from 'src/modules/client/repository/client.repository';

@Injectable()
export class GoogleSignInService {
  constructor(private readonly userRepository: UserRepository) {}

  async signInWithGoogle(payload: GoogleSignInRequest) {
    const user = await this.userRepository.findByGoogleAndEmail(payload.googleId,payload.email);
    if (user) {
      // User already exists, return user data
      return user;
    } else {
      // Create new user with Google ID
      const newUser = await this.userRepository.googleSignUp(payload);
      return newUser;
    }
  }

  private async linkGoogleAccount(email:string) {

    const user = await this.userRepository.findByEmail(email);
   
  }
}
