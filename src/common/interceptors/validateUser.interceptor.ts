import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ValidateUser implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest<Request>();

    if (!req.user) {
      throw new UnauthorizedException('Something went wrong');
    }

    const userId = (req.user as any).sub;
    const paramId = +req.params.id;

    // if (userId !== paramId) {
    //   throw new UnauthorizedException(
    //     'User not authorized to delete or update ',
    //   );
    // }

    return next.handle();
  }
}
