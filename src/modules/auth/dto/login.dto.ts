import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  value: string;

  @IsNotEmpty()
  password: string;
}
