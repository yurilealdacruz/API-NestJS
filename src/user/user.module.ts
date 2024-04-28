import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { userController } from "./user.controller";
import { prismaModule } from "src/prisma/prisma.module";
import { userService } from "./user.service";
import { UserIdCheckMiddleware } from "src/middlewares/user-id-check-middleware";


@Module({
    imports: [prismaModule],
    controllers: [userController],
    providers: [userService],
    exports: [userService]

})
export class userModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path : "users/:id",
            method : RequestMethod.ALL
        })
    }
}