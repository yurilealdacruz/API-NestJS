import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { prismaService } from "src/prisma/prisma.service";


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService, 
        private readonly prismaService: prismaService) 
        {}

    async createToken() {
        //return this.jwtService.sign()
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
        return user;
    }


    async resset(password: string, token: string) {

        //TO DO: Validar o Token

        const id = 0;

        await this.prismaService.user.update({
            where : {
                id
            },
            data: {
                password
            }
        });

        return true;

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
        return true;

    }


}