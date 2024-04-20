import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity({ name: 'PostDetails' })
export class PostDetailsEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ nullable: true })
  utilities: string;

  @Column({ nullable: true })
  pet: string;

  @Column({ nullable: true })
  income: string;

  @Column({ nullable: true })
  size: number;

  @Column({ nullable: true })
  school: number;

  @Column({ nullable: true })
  bus: number;

  @Column({ nullable: true })
  restaurant: number;

  @OneToOne(() => PostEntity, (post) => post.postDetail)
  post: PostEntity;
}
