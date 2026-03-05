import databseConfig from "./databse.config";
import { ConfigModuleOptions } from "@nestjs/config";
import jwtConfig from "./jwt.config";

export const appConfigs: ConfigModuleOptions = {
    isGlobal: true,
    load: [
        databseConfig,
        jwtConfig
    ],
}