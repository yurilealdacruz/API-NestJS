import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from "@nestjs/common";
import { userController } from "./user.controller";
import { userService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { AuthModule } from "../auth/auth.module";
import { UserIdCheckMiddleware } from "../middlewares/user-id-check-middleware";


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