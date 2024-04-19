import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class ValidatePost implements NestInterceptor {
  constructor(private postsService: PostsService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    const req: Request = httpContext.getRequest();

    if (!req.user) {
      throw new UnauthorizedException('Something went wrong');
    }

    const userId = (req.user as { sub: string }).sub;
    const postId = Number(req.params.id);

    const post = await this.postsService.findOne(postId);

    if (!post || (post.userId as any).id !== userId) {
      throw new UnauthorizedException(
        'User not authorized to delete this post',
      );
    }

    return next.handle();
  }
}
