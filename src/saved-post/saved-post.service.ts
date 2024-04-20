import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SavedPostEntity } from './entities/saved-post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SavedPostService {
  constructor(
    @InjectRepository(SavedPostEntity)
    private readonly savedPostRepo: Repository<SavedPostEntity>,
  ) {}
  async create(userId: string, postId: string) {
    const savedPost = await this.savedPostRepo.findOne({
      where: {
        postId,
        userId,
      },
    });

    if (savedPost) {
      await this.savedPostRepo.delete(savedPost.id);
      return 'removed successfully';
    } else {
      await this.savedPostRepo.save({ userId, postId });
      return 'saved successfully';
    }
  }
}
