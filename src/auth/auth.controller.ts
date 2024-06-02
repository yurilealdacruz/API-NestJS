import { Body, Controller, Post, Headers, UseGuards, Req } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto.ts";
import { AuthforgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto.ts";
import { userService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthMeDTO } from "./dto/auth-me.dto";
import { AuthGuard } from "src/guards/auth.guards";
import { User } from "src/decorators/user.decorator";


@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: userService,
        private readonly authService: AuthService

    ) {}

    @Post("login")
    async login(@Body() {email, password}: AuthLoginDTO) {
        return this.authService.login(email,password)
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {
        return this.authService.register(body)
    }

    @Post('forget')
    async forget(@Body() {email}: AuthforgetDTO) {
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDTO) {
        return this.authService.resset(password, token);
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user) {
        return {user}
    }

}