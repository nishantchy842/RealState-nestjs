import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { JwtService } from '@nestjs/jwt';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PostsModule],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UsersController);
  }
}
