import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Gender } from 'src/core/database/enums/gender.enums';

export class UpdateUserProfileDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsOptional()
  fullName: string;

  @ApiProperty({
    description: 'Profile description of the user',
    example: 'Software developer with 5 years of experience.',
  })
  @IsOptional()
  profile?: string;

  @ApiProperty({
    description: 'Date of birth of the user',
    example: '1990-01-01',
  })
  @IsOptional()
  dob?: Date;

  @ApiProperty({
    description: 'Gender of the user',
    example: 'male',
  })
  @IsOptional()
  @IsEnum(Object.values(Gender))
  gender?: Gender;
}
