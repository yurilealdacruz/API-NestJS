import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { prismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto.ts";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";


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

    async update(id: number, {name, email, password, birthAt}: UpdatePutUserDTO ){

        if (!birthAt) {
            birthAt = null;
        }

        return this.prisma.user.update({
            data : {name, email, password, birthAt: birthAt ? new Date(birthAt) : null}, 
            where : {id}
        })
    }

    async updatePartial(id: number, data: UpdatePatchUserDTO){
        console.log({data});
        return this.prisma.user.update({
            data,
            where: {id}
        })
    }

  
}