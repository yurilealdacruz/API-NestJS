import { Module } from "@nestjs/common";
import { userController } from "./user.controller";
import { prismaModule } from "src/prisma/prisma.module";
import { userService } from "./user.service";


@Module({
    imports: [prismaModule],
    controllers: [userController],
    providers: [userService],

})
export class userModule {

}