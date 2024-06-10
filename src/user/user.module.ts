import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from "@nestjs/common";
import { userController } from "./user.controller";
import { userService } from "./user.service";
import { UserIdCheckMiddleware } from "src/middlewares/user-id-check-middleware";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";


@Module({
    imports: [ forwardRef(() => AuthModule), 
               TypeOrmModule.forFeature([UserEntity])],
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