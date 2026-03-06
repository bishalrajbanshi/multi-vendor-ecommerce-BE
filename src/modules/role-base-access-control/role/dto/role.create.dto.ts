import { IsNotEmpty, IsString } from 'class-validator';

export class RoleCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
