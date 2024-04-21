import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ApiResponseInterceptor } from 'src/common/interceptors/apiResponse.interceptor';
import { Request } from 'express';
import { CreateMessageDto } from './dto/createMessage.dto';

@Controller('messages')
@ApiTags('Message')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post(':chatId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ApiResponseInterceptor)
  @ApiParam({ name: 'chatId' })
  async addmessage(
    @Param('chatId') chatId: string,
    @Req() req: Request,
    @Body() data: CreateMessageDto,
  ) {
    return await this.messagesService.addMessage(
      (req.user as any).sub,
      chatId,
      data.text,
    );
  }
}
