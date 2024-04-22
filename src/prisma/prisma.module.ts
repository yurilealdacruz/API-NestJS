import { Module } from "@nestjs/common";
import { prismaService } from "./prisma.service";


@Module({
    providers: [prismaService],
    exports: [prismaService],
})
export class prismaModule {}