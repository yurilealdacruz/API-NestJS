import { BadRequestException, Body, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { prismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto.ts";
import { userService } from "src/user/user.service";
import { access } from "fs";
import * as bcrypt from "bcrypt";
import { MailerService } from "@nestjs-modules/mailer";


@Injectable()
export class AuthService {

    private issuer = "login";
    private audience = "users";

    constructor(
        private readonly jwtService: JwtService, 
        private readonly prismaService: prismaService,
        private readonly userService: userService,
        private readonly mailer: MailerService,
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
                issuer: this.issuer,
                audience: this.audience,
            })
        }

    }

    checkToken(token : string) {

        try {
            const data =  this.jwtService.verify(token, {
                issuer: this.issuer,
                audience: this.audience
               })
            return data
        } catch(e) {
            throw new BadRequestException(e)
        }
      

    }

    isValidToken(token : string) {

        try {
        this.checkToken(token);
        return true;
        }
        catch (e) {
            return false;

        }

    }

    async login(email: string, password: string) {

        const user = await this.prismaService.user.findFirst({
            where : {
                email
            }
        })

        if (!user) {
            throw new UnauthorizedException('E-mail e/ou senha incorreto!');
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException('E-mail e/ou senha incorreto!');
        } else{
            return this.createToken(user);
        }
        
    }


    async resset(password: string, token: string) {

        try {
            const data:any =  this.jwtService.verify(token, {
                issuer: "forget",
                audience: "users"
               });

               if (isNaN(Number(data.id))) {
                    throw new BadRequestException("The token is invalid")
               }

               const salt = await bcrypt.genSalt()
               password = await bcrypt.hash(password, salt)

               const user = await this.prismaService.user.update({
                    where : {
                        id: Number(data.id)
                    },
                    data: {
                        password
                    }
                });
        
                return this.createToken(user);
        
        } catch(e) {
            throw new BadRequestException(e)
        }
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

        const token = this.jwtService.sign({
            id: user.id
        }, {expiresIn: "30 minutes",
            subject: String(user.id),
            issuer: "forget",
            audience: "users"}
    
    )

        await this.mailer.sendMail({
            subject: "Recuperação de Senha",
            to: "yuri@gmail.com",
            template: "forget",
            context: {
                name: user.name,
                token
            }
        });

        return true;

    }
    async register(data: AuthRegisterDTO) {
        const user = await this.userService.create(data)

        return this.createToken(user);
    }


}