import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  Req,
  Query,
} from '@nestjs/common';
import { SavedPostService } from './saved-post.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ApiResponseInterceptor } from 'src/common/interceptors/apiResponse.interceptor';
import { Request } from 'express';

@Controller('savedPost')
@ApiTags('Saved post')
export class SavedPostController {
  constructor(private readonly savedPostService: SavedPostService) {}

  @Post()
  @ApiOperation({ summary: 'save unsave post' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ApiResponseInterceptor)
  @ApiQuery({ name: 'postId' })
  create(@Req() req: Request, @Query('postId') postId: string) {
    return this.savedPostService.create((req.user as any).sub, postId);
  }
}
