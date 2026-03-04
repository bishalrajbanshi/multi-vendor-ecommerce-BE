import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { PgEnum } from 'drizzle-orm/pg-core';
import { GenderEnum } from 'src/core/drizzle/schema';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1234567890',
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'SecurePass123!',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Profile description of the user',
    example: 'Software developer with 5 years of experience.',
  })
  profile?: string;

  @ApiProperty({
    description: 'Date of birth of the user',
    example: '1990-01-01',
  })
  dob?: Date;

  @ApiProperty({
    description: 'Gender of the user',
    example: 'male',
  })
  @IsOptional()
  @IsEnum(Object.keys(GenderEnum))
  gender?: keyof typeof GenderEnum;
}
