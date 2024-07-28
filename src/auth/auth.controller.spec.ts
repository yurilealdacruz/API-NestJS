import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../guards/auth.guards';
import { guardMock } from '../testing/guard.mock';
import { AuthController } from './auth.controller';
import { AuthServiceMock } from '../testing/auth.sevice.mock';
import { FileServiceMock } from '../testing/file.sevice.mock';
import { authLoginDTO } from '../testing/auth.login.dto.mock';
import { accessToken } from '../testing/acess.token.mock';
import { authRegisterDTO } from '../testing/auth.register.dto.mock';
import { authForgetDTO } from '../testing/auth.forget.dto.mock';
import { authResetDTO } from '../testing/auth.reset.dto.mock';
import { UserEntityList } from '../testing/user.entiry.list.mock';
import { getPhoto } from '../testing/get.photo.mock';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthServiceMock, FileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  test('Validar a Definição', () => {
    expect(authController).toBeDefined();
  });

  describe('Fluxo de Autênticação', () => {
    test('Login Method', async () => {
      const result = await authController.login(authLoginDTO);
      expect(result).toEqual({ accessToken });
    });

    test('Register Method', async () => {
      const result = await authController.register(authRegisterDTO);
      expect(result).toEqual({ accessToken });
    });

    test('Forget Method', async () => {
      const result = await authController.forget(authForgetDTO);
      expect(result).toEqual({ success: true });
    });

    test('Reset Method', async () => {
      const result = await authController.reset(authResetDTO);
      expect(result).toEqual({ accessToken });
    });
  });

  describe('Rotas Autênticadas', () => {
    test('Me Method', async () => {
      const result = await authController.me(UserEntityList[0]);
      expect(result).toEqual(UserEntityList[0]);
    });

    test('UploadPhoto Method', async () => {
      const photo = await getPhoto();
      const result = await authController.uploadPhoto(UserEntityList[0], photo);
      expect(result).toEqual(photo);
    });
  });
});
