import * as Joi from '@hapi/joi';

export const envConfigValidation = {
  // Redis validation
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().port().required(),
  REDIS_DB: Joi.number().integer().min(0).required(),

  // Frontend URL validation
  FRONTEND_URL: Joi.string().optional(),
};
