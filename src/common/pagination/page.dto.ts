import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PageOptionsDto } from './page-option.dto';

export class PageDto<T> {
  @ApiProperty({ isArray: true })
  @IsArray()
  result: T[];

  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor(data: T[], itemCount: number, pageOptionDto?: PageOptionsDto) {
    this.result = data;
    this.itemCount = itemCount;
    if (pageOptionDto) {
      this.page = pageOptionDto.page;
      this.pageCount = Math.ceil(itemCount / pageOptionDto.take);
      this.take = pageOptionDto.take;
      this.hasPreviousPage = this.page > 1;
      this.hasNextPage = this.page < this.pageCount;
    }
  }
}
