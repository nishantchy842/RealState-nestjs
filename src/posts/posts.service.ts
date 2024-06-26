import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Between, Repository } from 'typeorm';
import { PageOptionsDto } from 'src/common/pagination/page-option.dto';
import { PageDto } from 'src/common/pagination/page.dto';
import { PaginationEnum } from 'src/common/enums/pagination.enum';
import { PostSearchDto } from './dto/postSearch.dto';
import { PostDetailsEntity } from './entities/postDetails.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,
    @InjectRepository(PostDetailsEntity)
    private readonly postDetailsRepo: Repository<PostDetailsEntity>,
  ) {}

  async create(createPostDto: CreatePostDto, req) {
    console.log(createPostDto, 'create');
    const { postDetails, ...rem } = createPostDto;

    const postDetailsRes = await this.postDetailsRepo.save({
      ...postDetails,
    });
    const post = await this.postRepo.save({
      ...rem,
      userId: req.sub,
      postDetail: postDetailsRes,
    });

    return { massage: 'created successfully', data: post };
  }

  async findAll(
    pageOptionDto: PageOptionsDto,
    postSearchDto: PostSearchDto,
  ): Promise<PageDto<PostEntity>> {
    const { page, take, pagination } = pageOptionDto;

    const itemCount = await this.postRepo.count();

    if (pagination === PaginationEnum.false) {
      const posts = await this.postRepo.find({
        relations: ['userId', 'postDetail', 'savedBy'],
      });

      return new PageDto(posts, itemCount, null);
    }

    if (pagination === PaginationEnum.true && !page && !take) {
      throw new BadRequestException(
        'page and take is required in pagination true',
      );
    }

    const posts = await this.AllPostAccQuery(pageOptionDto, postSearchDto);

    return await new PageDto(posts, itemCount, pageOptionDto);
  }

  async findOne(id: number): Promise<PostEntity> {
    return await this.postRepo.findOne({
      where: { id },
      relations: ['userId', 'postDetail', 'savedBy'],
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<any> {
    const post = await this.postRepo.update(id, updatePostDto);

    return {
      message: 'updated successfully',
      status: HttpStatus.OK,
      data: post,
    };
  }

  async remove(id: number): Promise<any> {
    return await this.postRepo.delete(id);
  }

  async AllPostAccQuery(
    pageOptionDto: PageOptionsDto,
    postSearch: PostSearchDto,
  ): Promise<PostEntity[]> {
    const where: PostEntity | any = {};

    if (postSearch.city) {
      where.city = postSearch.city;
    }
    if (postSearch.type) {
      where.type = postSearch.type;
    }
    if (postSearch.property) {
      where.property = postSearch.property;
    }
    if (postSearch.bedroom) {
      where.bedroom = postSearch.bedroom;
    }
    if (postSearch.priceMin && postSearch.priceMax) {
      where.price = Between(postSearch.priceMin, postSearch.priceMax);
    }

    const { take, order, skip } = pageOptionDto;

    const post = await this.postRepo.find({
      where,
      relations: ['userId', 'postDetail', 'savedBy'],
      take,
      skip,
      order: {
        updatedAt: order,
      },
    });

    return post;
  }
}
