import { MessageEntity } from 'src/messages/entity/message.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'Chats' })
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => UserEntity)
  @JoinTable({ name: 'Chat_User' })
  users: UserEntity[];

  @Column('simple-array', { name: 'userids' })
  userIDs: string[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'simple-array', nullable: true })
  seenBy: string[];

  @OneToMany(() => MessageEntity, (message) => message.chat)
  messages: string[];

  @Column({ nullable: true })
  lastMessage: string;

  receiver: UserEntity;
}
