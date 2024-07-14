import { Test, TestingModule } from "@nestjs/testing"
import { userRepositoryMock } from "../testing/user.repository.mock"
import { JwtServiceMock } from "../testing/jwt.service.mock"
import { UserServiceMock } from "../testing/user.sevice.mock"
import { AuthService } from "./auth.service"
import { MailerServiceMock } from "../testing/mailer.service.mock"
import { accessToken } from "../testing/acess.token.mock"
import { UserEntityList } from "../testing/user.entiry.list.mock"
import { jwtPayload } from "../testing/jwt.payload.mock"
import { resetToken } from "../testing/reset.token.mock"
import { authRegisterDTO } from "../testing/auth.register.dto.mock"

describe('AuthService', () => {

    let authService: AuthService;


    beforeEach(async () => {


        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                userRepositoryMock,
                JwtServiceMock,
                UserServiceMock,
                MailerServiceMock
                ]
        }).compile()

        authService = module.get<AuthService>(AuthService)
    });

    test('Validar a definição', () => {
        expect(authService).toBeDefined()
    })

    describe("Token", () => {

        test("Method CreateToken", async () => {
            const result = await authService.createToken(UserEntityList[0])
            expect(result).toEqual({accessToken});
        })

        
        test("Method CheckToken",  async () => {
            try {
                const result = await authService.checkToken(accessToken);
                expect(result).toEqual(jwtPayload);
            } catch (error) {
                console.error(error);
                throw error; // Re-throws the error to fail the test explicitly
            };
        })
    
        test("Method IsValidToken", () => {
            const result =  authService.isValidToken(accessToken)
           expect(result).toEqual(true)
       })



    })
    describe("Autenticação", () => {

        test("Method Login", async () => {
            const result =  await authService.login("yuri@email.com", "123456")
           expect(result).toEqual({accessToken})
       })

        test("Method Forget", async () => {
            const result = await authService.forget("yuri@email.com")
        expect(result).toEqual({success:true})
    })

        test("Method Reset", async () => {
            const result = await authService.resset("654321", resetToken)
            expect(result.accessToken).toEqual(accessToken);
        })

        test("Method Register", async () => {
            const result = await authService.register(authRegisterDTO)
            expect(result.accessToken).toEqual(accessToken);
        })

    })


})