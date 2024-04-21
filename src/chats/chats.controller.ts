import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ApiResponseInterceptor } from 'src/common/interceptors/apiResponse.interceptor';
import { Request } from 'express';

@Controller('chats')
@ApiTags('Chats')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ApiResponseInterceptor)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post(':receiverUsername')
  @ApiOperation({ summary: 'post chat' })
  @ApiParam({ name: 'receiverUsername' })
  create(
    @Param('receiverUsername') receiverUsername: string,
    @Req() req: Request,
  ) {
    return this.chatsService.create(
      (req.user as any).username,
      receiverUsername,
    );
  }

  @Get()
  @ApiOperation({ summary: 'get all chats' })
  findAll(@Req() req: Request) {
    return this.chatsService.findAll((req.user as any).sub);
  }

  @Get(':chatId')
  @ApiOperation({ summary: 'get single chat' })
  @ApiParam({ name: 'chatId' })
  findOne(@Param('chatId') chatId: string, @Req() req: Request) {
    return this.chatsService.findOne(chatId, +(req.user as any).sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'get all chats' })
  update() {
    // return this.chatsService.update(+id, updateChatDto);
  }
}
