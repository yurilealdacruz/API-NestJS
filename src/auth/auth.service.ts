import { Body, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { prismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto.ts";
import { userService } from "src/user/user.service";
import { access } from "fs";


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService, 
        private readonly prismaService: prismaService,
        private readonly userService: userService
    ) 
        {}

    async createToken(user:User) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            },{
                expiresIn: "7 days",
                subject: String(user.id),
                issuer: "login",
                audience: "users"
            })
        }

    }

    async checkToken(token : string) {
       //return this.jwtService.verify()

    }

    async login(email: string, password: string) {
        const user = await this.prismaService.user.findFirst({
            where : {
                email,
                password
            }
        })

        if (!user) {
            throw new UnauthorizedException('E-mail e/ou senha incorreto!');
        }
        return this.createToken(user);
    }


    async resset(password: string, token: string) {

        //TO DO: Validar o Token

        const id = 0;

       const user = await this.prismaService.user.update({
            where : {
                id
            },
            data: {
                password
            }
        });

        return this.createToken(user);

    }


    async forget(email: string) {

        const user = await this.prismaService.user.findFirst({
            where: {
                email
            }
        })

        if (!user) {
            throw new UnauthorizedException('E-mail incorreto!')
        }

        //TO DO: Enviar E-mail
        return this.createToken(user);

    }
    async register(data: AuthRegisterDTO) {
        const user = await this.userService.create(data)

        return this.createToken(user);
    }


}