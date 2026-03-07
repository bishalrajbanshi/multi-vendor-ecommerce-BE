export type AuthRequest = {
  value: string;
  password: string;
};

export interface GoogleSignInRequest {
  email: string;
  name: string;
  googleId: string;
  avatar: string;
  accessToken: string;
}
