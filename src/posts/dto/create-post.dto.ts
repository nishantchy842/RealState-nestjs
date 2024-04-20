import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PostTypeEnum } from 'src/common/enums/postType.enum';
import { PropertyEnum } from 'src/common/enums/property.enum';
import { CreatePostDetailsDto } from './postDetails.dto';

export class CreatePostDto {
  @ApiProperty({
    example: 'your post title',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 5000,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    example: ['url1', 'url2'],
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly images: string[];

  @ApiProperty({
    example: 'your post address',
  })
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @ApiProperty({
    example: 'your post city',
  })
  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @ApiProperty({
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly bedroom: number;

  @ApiProperty({
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly bathroom: number;

  @ApiProperty({
    example: '2',
  })
  @IsNotEmpty()
  @IsString()
  readonly latitude: string;

  @ApiProperty({
    example: '2',
  })
  @IsNotEmpty()
  @IsString()
  readonly longitude: string;

  @ApiProperty({
    enum: PostTypeEnum,
    default: PostTypeEnum.rent,
  })
  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @ApiProperty({
    enum: PropertyEnum,
    description: 'Property type',
    default: PropertyEnum.house,
  })
  @IsNotEmpty()
  @IsString()
  readonly property: PropertyEnum;

  @ApiProperty({ type: CreatePostDetailsDto })
  readonly postDetails?: CreatePostDetailsDto;
}
