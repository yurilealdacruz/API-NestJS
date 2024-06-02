import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthService } from "src/auth/auth.service";
import { ROLES_KEY } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { userService } from "src/user/user.service";


@Injectable()
export class RoleGuard implements CanActivate {

    constructor (private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext) {

        const requeridRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

        
        if (!requeridRoles){
            return true;
        }

        console.log({requeridRoles})

        const {user} = context.switchToHttp().getRequest()

        const rolesFilted = requeridRoles.filter(role => role === user.role)

        return rolesFilted.length > 0;

        
        
    }

}