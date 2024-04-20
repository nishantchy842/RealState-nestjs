import { PostEntity } from 'src/posts/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({ type: 'simple-array', nullable: true })
  savedPosts: number[];

  //   @Column()
  //   chats: string[];

  //   @Column()
  //   chatIDs: string[];
}
