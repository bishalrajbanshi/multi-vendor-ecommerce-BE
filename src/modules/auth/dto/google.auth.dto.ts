import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GoogleAuthDto {
  @ApiProperty({
    description: 'Google ID of the user',
    example: '1234567890',
  })
  @IsNotEmpty()
  googleId: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Avatar URL of the user',
    example: 'https://example.com/avatar.jpg',
  })
  @IsNotEmpty()
  avatar: string;

  @ApiProperty({
    description: 'Access token for the user',
    example: 'access_token_example',
  })
  @IsNotEmpty()
  accessToken: string;
}
