import { PartialType } from '@nestjs/swagger';
import { CreateSavedPostDto } from './create-saved-post.dto';

export class UpdateSavedPostDto extends PartialType(CreateSavedPostDto) {}
