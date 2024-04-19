import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
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

  findAll() {
    return this.userRepo.find({ relations: ['posts'] });
  }

  async findOne(username: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { username } });
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
