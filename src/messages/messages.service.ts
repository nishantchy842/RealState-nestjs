import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './entity/message.entity';
import { Repository } from 'typeorm';
import { ChatsService } from 'src/chats/chats.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepo: Repository<MessageEntity>,
    private readonly chatsService: ChatsService,
  ) {}

  async addMessage(
    userId: string,
    chatId: string,
    text: string,
  ): Promise<MessageEntity> {
    const chat = await this.chatsService.findOne(chatId, Number(userId));

    if (!chat) {
      throw new NotFoundException();
    }

    const message = this.messageRepo.create({
      text,
      userId,
      chatId,
    });

    await this.messageRepo.save(message);

    await this.chatsService.update(userId, chatId, text);

    return message;
  }
}
