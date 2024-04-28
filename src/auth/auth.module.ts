import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { userModule } from "src/user/user.module";
import { prismaModule } from "src/prisma/prisma.module";


@Module({
    imports : [JwtModule.register({
        secret: 'apenasumprojetodeteste@123',
    }),
    userModule,
    prismaModule

],
    controllers: [AuthController]
})
export class AuthModule {}