import * as joi from 'joi';
import { PostTypeEnum } from 'src/common/enums/postType.enum';

export const CREATE_POST_SCHEMA = joi.object({
  title: joi.string().required(),
  price: joi.number().min(1000).required(),
  images: joi.array().required(),
  address: joi.string().required(),
  city: joi.string().required(),
  bedroom: joi.number().required(),
  bathroom: joi.number().required(),
  latitude: joi.string().required(),
  longitude: joi.string().required(),
  type: joi
    .string()
    .valid(...Object.values(PostTypeEnum))
    .required(),
});
