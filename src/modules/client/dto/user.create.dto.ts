import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'client phone number',
    example: '+1234567890',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
