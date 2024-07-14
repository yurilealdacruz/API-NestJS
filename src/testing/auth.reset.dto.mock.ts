import { AuthResetDTO } from "../auth/dto/auth-reset.dto.ts";
import { resetToken } from "./reset.token.mock";


export const authResetDTO: AuthResetDTO = {
    password: "123456",
    token: resetToken
}