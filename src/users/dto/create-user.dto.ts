import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'username',
  })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({
    example: 'test@gamil.com',
  })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({
    example: 'pass',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/dgil1ngmu/image/upload/v1713504170/awwkannyohfmnkai9qfr.jpg',
  })
  @IsOptional()
  @IsString()
  readonly avatar: string;
}
