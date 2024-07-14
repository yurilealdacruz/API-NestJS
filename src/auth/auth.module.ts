import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userModule } from "../user/user.module";
import { UserEntity } from "../user/entity/user.entity";
import { FileModule } from "../file/file.module";


@Module({
    imports : [JwtModule.register({
        secret: String(process.env.JWT_SECRET)
    }),
    forwardRef(() => userModule),
    FileModule,
    TypeOrmModule.forFeature([UserEntity])

],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}