import * as joi from 'joi';
import { PostTypeEnum } from 'src/common/enums/postType.enum';
import { PropertyEnum } from 'src/common/enums/property.enum';

export const POST_DETAILS_SCHEMA = joi.object({
  desc: joi.string().optional(),
  utilities: joi.string().optional(),
  pet: joi.string().optional(),
  income: joi.string().optional(),
  size: joi.number().optional(),
  school: joi.number().optional(),
  bus: joi.number().optional(),
  restaurant: joi.number().optional(),
});

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
  property: joi
    .string()
    .valid(...Object.values(PropertyEnum))
    .required(),
  postDetails: joi
    .alternatives()
    .try(joi.string(), POST_DETAILS_SCHEMA)
    .optional(),
});
