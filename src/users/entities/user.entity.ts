import { ChatEntity } from 'src/chats/entities/chat.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { SavedPostEntity } from 'src/saved-post/entities/saved-post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'User' })
@Unique(['username'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => PostEntity, (post) => post.userId)
  posts: PostEntity[];

  @OneToMany(() => SavedPostEntity, (savedPost) => savedPost.user)
  savedPosts: SavedPostEntity[];

  @ManyToMany(() => ChatEntity)
  chats: ChatEntity[];

  //   @Column()
  //   chatIDs: string[];
}
