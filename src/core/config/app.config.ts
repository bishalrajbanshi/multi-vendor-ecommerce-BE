import databseConfig from "./databse.config";
import { ConfigModuleOptions } from "@nestjs/config";

export const appConfigs: ConfigModuleOptions = {
    isGlobal: true,
    load: [
        databseConfig
    ],
}