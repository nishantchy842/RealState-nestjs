import { Injectable } from '@nestjs/common';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepo: Repository<ChatEntity>,
    private readonly userService: UsersService,
  ) {}
  async create(username: string, receiverUsername: string) {
    const [user, receiver] = await Promise.all([
      this.userService.findOne(username),
      this.userService.findOne(receiverUsername),
    ]);

    if (!user || !receiver) {
      throw new Error('User not found');
    }

    const chatEntity = new ChatEntity();
    chatEntity.users = [user, receiver];
    chatEntity.userIDs = [user.id.toString(), receiver.id.toString()];

    return this.chatRepo.save(chatEntity);
  }

  async findAll(id: string) {
    try {
      const chats = await this.chatRepo
        .createQueryBuilder('chat')
        .leftJoinAndSelect('chat.users', 'users')
        .where(":userId = ANY ( string_to_array(chat.userIDs, ','))", {
          userId: id,
        })
        .getMany();

      for (const chat of chats) {
        const receiverId = chat.userIDs.find((userid) => userid != id);
        const receiver = await this.userService.findById(Number(receiverId));

        chat.receiver = receiver;
      }

      return chats;
    } catch (err) {
      console.log(err);

      return err;
    }
  }

  async findOne(id: string, userId: number) {
    // SELECT * FROM chat WHERE chat.id = :chatId AND :tokenUserId = ANY(chat.userIDs)
    const chat = await this.chatRepo
      .createQueryBuilder('chats')
      .leftJoinAndSelect('chats.messages', 'messages')
      .where('chats.id = :id', { id }) // Use parameter placeholder for chat id
      // .where(":userId = ANY ( string_to_array(chats.userIDs, ','))", {
      //   userId: id,
      // })
      .orderBy('chats.createdAt', 'ASC')
      .getOne();

    if (chat) {
      await this.chatRepo.update(id, {
        seenBy: [userId.toString()], // Append userId to seenBy array
      });
    }

    return chat;
  }

  async update(userId: string, chatId: string, text: string) {
    const chat = await this.chatRepo.update(chatId, {
      seenBy: [userId],
      lastMessage: text,
    });
    return chat;
  }
}
