import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { prismaService } from "src/prisma/prisma.service";


@Injectable()
export class userService {

    constructor(private readonly prisma: prismaService) {}

    async create(data: CreateUserDTO) {

        return this.prisma.user.create({
            data
        })
    }


    async list(){

        return this.prisma.user.findMany({
           /*
            where: {
                email: {
                    contains: "@gmail.com"
                }
            }
            */
        })
    }

    async show(id: number) {
        return this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

  
}