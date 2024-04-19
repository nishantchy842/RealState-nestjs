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
  @UseInterceptors(ApiResponseInterceptor)
  findAll(@Param() pageOptionDto: PageOptionsDto): Promise<any> {
    return this.usersService.findAll(pageOptionDto);
  }

  @Get('user')
  @ApiBearerAuth()
  @UseInterceptors(ApiResponseInterceptor)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ApiResponseInterceptor)
  findOne(@Req() req: Request) {
    const user: User | any = req.user;

    return this.usersService.findOne(user.username);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ValidateUser)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
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
