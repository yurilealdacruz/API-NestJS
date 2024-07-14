import { Role } from "../enums/role.enum"
import { CreateUserDTO } from "../user/dto/create-user.dto"
import { UpdatePutUserDTO } from "../user/dto/update-put-user.dto.ts"

export const updatePutUserDTO:UpdatePutUserDTO = {
    birthAt: '2000-01-01',
    email: 'teste@email.com',
    name: 'Teste 123',
    password: '123456',
    role: Role.User}
