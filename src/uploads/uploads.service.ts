import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoEntity } from './entity/photo.entity';
import { Repository } from 'typeorm';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photoRepo: Repository<PhotoEntity>,
    readonly postService: PostsService,
    private readonly cloudinary: CloudinaryService,
  ) {}
  async uploadImageToCloudinary(file: Express.Multer.File[]) {
    const uploadResponses = [];

    for (const item of file) {
      const uploadResponse = await this.cloudinary
        .uploadImage(item)
        .catch(() => {
          throw new BadRequestException('Invalid file type.');
        });

      const { secure_url, bytes } = uploadResponse;
      uploadResponses.push({ url: secure_url, bytes });
    }
    return uploadResponses;
  }

  async singleImage(file: Express.Multer.File) {
    const uploadResponse = await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });

    const { secure_url, bytes } = uploadResponse;

    return {
      url: secure_url,
      bytes,
    };
  }

  async create(url: string, postId: number) {
    const post = await this.postService.findOne(postId);

    const photo = await this.photoRepo.save({
      url,
      post: post,
    });

    return {
      message: 'Created successfully',
      result: photo,
    };
  }
}
