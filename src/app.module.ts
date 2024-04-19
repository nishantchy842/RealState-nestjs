import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './config/orm.config';
import { PostsModule } from './posts/posts.module';
import { UploadsModule } from './uploads/uploads.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync(OrmConfig),
    PostsModule,
    UploadsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
