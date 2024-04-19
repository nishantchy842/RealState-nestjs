import { PostEntity } from 'src/posts/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'User' })
@Unique(['username'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

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

  @OneToMany(() => PostEntity, (post) => post.userId)
  posts: PostEntity[];

  //   @Column()
  //   savedPosts: string[];

  //   @Column()
  //   chats: string[];

  //   @Column()
  //   chatIDs: string[];
}
