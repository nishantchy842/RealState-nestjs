import { PostTypeEnum } from 'src/common/enums/postType.enum';
import { PropertyEnum } from 'src/common/enums/property.enum';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ database: process.env.POSTGRES_DATABASE, name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column({ type: 'simple-array' })
  images: string[];

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  bedroom: number;

  @Column()
  bathroom: number;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column({ enum: PostTypeEnum, nullable: true })
  type: string;

  @Column({ enum: PropertyEnum, nullable: true })
  property: PropertyEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //   @Column()
  //   user: User;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  userId: string;

  //   @Column()
  //   postDetail: PostDetail?;

  //   @Column()
  //   savedPosts: SavedPost[];
}
