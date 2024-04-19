import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity({ name: 'Photos' })
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  photoId: number;

  @Column()
  url: string;

  @ManyToOne(() => PostEntity, (post) => post.images)
  post: PostEntity;
}
