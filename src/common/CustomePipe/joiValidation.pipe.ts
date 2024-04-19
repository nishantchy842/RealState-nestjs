import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    // Only doing body checking with this pipe for now

    if (metadata.type === 'body') {
      const { error } = this.schema.validate(value, { abortEarly: false });
      if (error) {
        throw new BadRequestException(
          'Validation failed',
          error.details[0].message,
        );
      }
    }
    return value;
  }
}
