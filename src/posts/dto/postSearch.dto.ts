import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsInt,
  IsNumberString,
  Min,
  IsEnum,
} from 'class-validator';
import { PostTypeEnum } from 'src/common/enums/postType.enum';
import { PropertyEnum } from 'src/common/enums/property.enum';

export class PostSearchDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly city?: string;

  @ApiPropertyOptional({ enum: PostTypeEnum })
  @IsOptional()
  @IsEnum(PostTypeEnum)
  readonly type?: PostTypeEnum;

  @ApiPropertyOptional({ enum: PropertyEnum })
  @IsOptional()
  @IsString()
  readonly property?: PropertyEnum;

  @ApiPropertyOptional({ description: '12' })
  @IsOptional()
  @IsInt()
  readonly bedroom?: number;

  @ApiPropertyOptional({ description: '12' })
  @IsOptional()
  @IsNumberString()
  @Min(0)
  readonly priceMin?: string;

  @ApiPropertyOptional({ description: '12' })
  @IsOptional()
  @IsNumberString()
  @Min(0)
  readonly priceMax?: string;
}
