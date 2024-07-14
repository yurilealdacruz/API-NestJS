import { CanActivate, ExecutionContext, Inject, Injectable, forwardRef } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { userService } from "../user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor (
                 private readonly authService: AuthService,
                 private readonly useService: userService
    ) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const {authorization} = request.headers

        try{
        const data = this.authService.checkToken((authorization ?? "").split(" ")[1]);

        request.tokenPayLoad = data
        
        request.user = await this.useService.show(data.id)

        return true
        } catch (e) {
            return false;
        }
        
        
    }

}