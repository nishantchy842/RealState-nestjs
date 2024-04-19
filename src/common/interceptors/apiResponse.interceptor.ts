import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';

export class ApiResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = new Date();
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();

    const controller = context.getClass();
    const isErrorHandler = Reflect.getMetadata('errorHandler', controller);

    if (isErrorHandler) {
      return next.handle().pipe(
        catchError((error) => {
          // Handle the error here
          console.error('An error occurred:', error);
          throw new Error(error);
        }),
      );
    }

    return next.handle().pipe(
      map((data) => ({
        statusCode: response.statusCode || HttpStatus.OK,
        message: response.statusMessage || 'Success',
        timestamp: now,
        data,
      })),
    );
  }
}
