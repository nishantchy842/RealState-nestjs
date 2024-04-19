import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PageOptionsDto } from 'src/common/pagination/page-option.dto';
import { PageDto } from 'src/common/pagination/page.dto';
import { PaginationEnum } from 'src/common/enums/pagination.enum';

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

  async findAll(pageOptionDto: PageOptionsDto): Promise<PageDto<PostEntity>> {
    const { page, take, pagination, order } = pageOptionDto;

    const itemCount = await this.postRepo.count();

    if (pagination === PaginationEnum.false) {
      const posts = await this.postRepo.find({
        relations: ['userId'],
      });

      return new PageDto(posts, itemCount, null);
    }

    const posts = await this.postRepo.find({
      relations: ['userId'],
      take,
      skip: (page - 1) * take,
      order: {
        updatedAt: order,
      },
    });

    return await new PageDto(posts, itemCount, pageOptionDto);
  }

  async findOne(id: number): Promise<PostEntity> {
    return await this.postRepo.findOne({
      where: { id },
      relations: ['userId'],
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: number): Promise<any> {
    console.log(id, 'id');
    // return await this.postRepo.delete(id);
  }
}
