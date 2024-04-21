import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 'your message' })
  @IsNotEmpty()
  text: string;
}
