import databseConfig from './databse.config';
import { ConfigModuleOptions } from '@nestjs/config';
import jwtConfig from './jwt.config';
import googleOAuthConfig from './google.OAuth.config';
import { envConfigValidation } from './env.config';
import * as Joi from "@hapi/joi";


export const appConfigs: ConfigModuleOptions = {
  isGlobal: true,
  load: [databseConfig, jwtConfig, googleOAuthConfig],
  validationSchema: Joi.object({
     DATABASE_URL: Joi.string().required(),
    GOOGLE_CLIENT_ID: Joi.string().required(),
    GOOGLE_CLIENT_SECRET: Joi.string().required(),
    GOOGLE_CALLBACK_URL: Joi.string().required(),
    ACCESS_TOKEN_SECRET: Joi.string().required(),
    ACCESS_EXPIRATION_TIME: Joi.string().required(),
    REFRESH_TOKEN_SECRET:Joi.string().required(),
    REFRESH_EXPIRATION_TIME:Joi.string().required(),
    ...envConfigValidation
  })
};
