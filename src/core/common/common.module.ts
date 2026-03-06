import { Module } from "@nestjs/common";
import { passwordService } from "./passowrd.service";



@Module({
    imports: [],
    providers: [
        passwordService
    ],
    exports: []
})

export class CommonModule {}