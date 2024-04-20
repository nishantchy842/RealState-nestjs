import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDetailsDto {
  @ApiProperty({ example: 'writer your description' })
  @IsOptional()
  @IsString()
  readonly desc: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly utilities?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly pet?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly income?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly size?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly school?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly bus?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly restaurant?: number;
}
