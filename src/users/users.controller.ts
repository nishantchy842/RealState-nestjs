import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ApiResponseInterceptor } from 'src/common/interceptors/apiResponse.interceptor';
import { ValidateUser } from 'src/common/interceptors/validateUser.interceptor';
import { PageOptionsDto } from 'src/common/pagination/page-option.dto';

type User = {
  username: string;
  email: string;
};

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseInterceptors(ApiResponseInterceptor)
  async findAll(@Param() pageOptionDto: PageOptionsDto) {
    return await this.usersService.findAll(pageOptionDto);
  }

  @Get('user')
  @ApiBearerAuth()
  @UseInterceptors(ApiResponseInterceptor)
  @UseGuards(JwtAuthGuard)
  async findOne(@Req() req: Request) {
    const user: User | any = req.user;

    return await this.usersService.findOne(user.username);
  }

  @Get('post')
  @ApiOperation({ summary: 'all post of login user' })
  @ApiBearerAuth()
  @UseInterceptors(ApiResponseInterceptor)
  @UseGuards(JwtAuthGuard)
  async findAllPost(@Req() req: Request) {
    console.log(req.user, 'res');
    return await this.usersService.userAllPosts((req.user as any).username);
  }

  @Patch()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ValidateUser)
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update((req.user as any).sub, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete yourself permanently' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ValidateUser)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
