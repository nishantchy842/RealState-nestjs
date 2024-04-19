import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto, req) {
    const res = await this.postRepo.save({ ...createPostDto, userId: req.sub });

    return res;
  }

  async findAll() {
    return await this.postRepo.find({
      relations: ['userId'],
    });
  }

  async findOne(id: number): Promise<PostEntity> {
    return await this.postRepo.findOne({ where: { id } });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
