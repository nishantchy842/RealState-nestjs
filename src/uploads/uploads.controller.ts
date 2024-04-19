import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

class uploadPhotoDto {
  @ApiProperty({ description: 'photo url' })
  url: string;
}

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadServices: UploadsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files, 'fils');
    return await this.uploadServices.uploadImageToCloudinary(files);
  }

  @Post('/singleImage')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'single Image upload' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadSingleImage(@UploadedFile() file: Express.Multer.File) {
    return await this.uploadServices.singleImage(file);
  }

  @Post('/:postId')
  @ApiParam({ name: 'postId' })
  async create(@Param('postId') postId: number, @Body() url: uploadPhotoDto) {
    return await this.uploadServices.create(url.url, postId);
  }
}
