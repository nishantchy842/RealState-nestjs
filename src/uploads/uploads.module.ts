import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoEntity } from './entity/photo.entity';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    CloudinaryModule,
    TypeOrmModule.forFeature([PhotoEntity]),
    PostsModule,
  ],
  providers: [UploadsService],
  controllers: [UploadsController],
})
export class UploadsModule {}
