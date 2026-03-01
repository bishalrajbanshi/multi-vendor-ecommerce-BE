import { IsNumber, IsOptional, IsString } from 'class-validator';

export class queryRoleDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  perPage?: number;
}
