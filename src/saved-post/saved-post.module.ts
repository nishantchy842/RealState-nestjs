import { Module } from '@nestjs/common';
import { SavedPostService } from './saved-post.service';
import { SavedPostController } from './saved-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedPostEntity } from './entities/saved-post.entity';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SavedPostEntity]),
    UsersModule,
    PostsModule,
  ],
  controllers: [SavedPostController],
  providers: [SavedPostService],
  exports: [SavedPostService],
})
export class SavedPostModule {}
