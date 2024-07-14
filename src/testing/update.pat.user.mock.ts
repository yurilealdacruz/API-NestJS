import { Role } from "../enums/role.enum"
import { CreateUserDTO } from "../user/dto/create-user.dto"
import { UpdatePatchUserDTO } from "../user/dto/update-patch-user.dto"
import { UpdatePutUserDTO } from "../user/dto/update-put-user.dto.ts"

export const updatePatchUserDTO:UpdatePatchUserDTO= {
    role: Role.Admin
}
