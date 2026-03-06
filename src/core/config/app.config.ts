import databseConfig from "./databse.config";
import { ConfigModuleOptions } from "@nestjs/config";
import jwtConfig from "./jwt.config";
import googleOAuthConfig from "./google.OAuth.config";

export const appConfigs: ConfigModuleOptions = {
    isGlobal: true,
    load: [
        databseConfig,
        jwtConfig,
        googleOAuthConfig
    ],
}