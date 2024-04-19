import * as joi from 'joi';

export const REGISTER_VALIDATION = joi.object({
  username: joi.string().required(),
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  avatar: joi.string().optional(),
});
