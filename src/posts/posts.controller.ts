import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JoiValidationPipe } from 'src/common/CustomePipe/joiValidation.pipe';
import { CREATE_POST_SCHEMA } from './schema/createPost.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ApiResponseInterceptor } from 'src/common/interceptors/apiResponse.interceptor';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CREATE_POST_SCHEMA))
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    return this.postsService.create(createPostDto, req.user);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ApiResponseInterceptor)
  async findOne(@Param('id') id: string) {
    return await this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
