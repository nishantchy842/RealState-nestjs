import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ default: 'nishant' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ default: 'pass1234' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
