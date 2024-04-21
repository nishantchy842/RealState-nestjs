import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PostsService } from 'src/posts/posts.service';
import { PostEntity } from 'src/posts/entities/post.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly postService: PostsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password: pass } = createUserDto;

    const hash = await bcrypt.hash(pass, 10);

    const res = await this.userRepo.save({
      ...createUserDto,
      password: hash,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rem } = res;

    return {
      message: 'Register successfully',
      result: rem,
    };
  }

  async findAll(username: string): Promise<UserEntity> {
    const users = await this.userRepo.findOne({
      where: { username },
      relations: ['posts', 'savedPosts'],
      // take,
      // skip: pageOptionDto.skip,
      // order: {
      //   updatedAt: order,
      // },
    });

    const savedPosts: PostEntity[] = [];

    for (const item of users.savedPosts) {
      const posts = await this.postService.findOne(Number(item.postId));

      savedPosts.push(posts);
    }

    return { ...users, savedPosts: savedPosts as any };
  }

  async findOne(username: string): Promise<UserEntity> {
    return await this.userRepo.findOne({
      where: { username },
    });
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepo.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  // fix this latter some validation
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });

    const checkUsername = await this.findOne(updateUserDto.username);

    if (checkUsername && checkUsername.username != user.username) {
      throw new HttpException(
        'Username exists try another username',
        HttpStatus.BAD_REQUEST,
      );
    }

    const checkEmail = await this.findByEmail(updateUserDto.email);

    if (checkEmail && checkEmail.email !== user.email) {
      throw new HttpException(
        'User with this email already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPass = await bcrypt.hash(updateUserDto.password, 10);

    return await this.userRepo.update(id, {
      ...updateUserDto,
      password: hashPass,
    });
  }

  async remove(id: number) {
    return this.userRepo.delete(id);
  }
}
