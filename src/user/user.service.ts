import { Injectable, NotFoundException, Param } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { prismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto.ts";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import * as bcrypt from "bcrypt";


@Injectable()
export class userService {

    constructor(private readonly prisma: prismaService) {}

    async create(data: CreateUserDTO) {


        const salt = await bcrypt.genSalt()
        data.password = await bcrypt.hash(data.password, salt)
        
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
        await this.exists(id);
        return this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async update(id: number, {name, email, password, birthAt, role}: UpdatePutUserDTO ){

        await this.exists(id);

        
        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt)

        if (!birthAt) {
            birthAt = null;
        }

        return this.prisma.user.update({
            data : {name, email, password, birthAt: birthAt ? new Date(birthAt) : null, role}, 
            where : {id}
        })
    }

    async updatePartial(id: number, {name, email, password, birthAt, role} : UpdatePatchUserDTO){
        console.log('Service updatePartial received:', {name, email, password, birthAt, role}); // Log para depuração
        
        await this.exists(id);
        const data: any = {};

        if (birthAt !== undefined) {
            data.birthAt = new Date(birthAt);
        }

        if (email !== undefined) {
            data.email = email;
        }

        if (name !== undefined) {
            data.name = name;
        }

        if (password !== undefined) {
            data.password = await bcrypt.hash(password,await bcrypt.genSalt());

        }
        if (role !== undefined) {
            data.role = role;
        }

        console.log('Updating user with data:', data); // Log para depuração

        return this.prisma.user.update({
            data,
            where: {id}
        })
    }

    async delete(id: number) {

        await this.exists(id);

        return this.prisma.user.delete({
            where : {
                id
            }
        })

    }

    async exists(id: number) {

        if ( !(await this.prisma.user.count({

        where : {
            id
        }
        })))    
            {
            throw new NotFoundException(`O suário ${id} não existe.`)
        }
    }
  
}