import { Test, TestingModule } from '@nestjs/testing';
import { userController } from './user.controller';
import { UserServiceMock } from '../testing/user.sevice.mock';
import { AuthGuard } from '../guards/auth.guards';
import { guardMock } from '../testing/guard.mock';
import { RoleGuard } from '../guards/role.guards';
import { UserService } from './user.service';
import { createUserDTO } from '../testing/create.user.dto.mock';
import { UserEntityList } from '../testing/user.entiry.list.mock';
import { updatePutUserDTO } from '../testing/update.put.user.mock';
import { updatePatchUserDTO } from '../testing/update.pat.user.mock';

describe('UserController', () => {
  let UserController: userController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [userController],
      providers: [UserServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    UserController = module.get<userController>(userController);
    userService = module.get<UserService>(UserService);
  });

  test('Validar a Definição', () => {
    expect(UserController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Teste da Aplicação dos Guards nesse controller', () => {
    test('Se os guards estão aplicados no controller', () => {
      const guards = Reflect.getMetadata('__guards__', userController);

      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    test('Create Method', async () => {
      const result = await UserController.create(createUserDTO);
      expect(result).toEqual(UserEntityList[0]);
    });
  });

  describe('Read', () => {
    test('List Method', async () => {
      const result = await UserController.list();

      expect(result).toEqual(UserEntityList);
    });

    test('Show Method', async () => {
      const result = await UserController.show(1);

      expect(result).toEqual(UserEntityList[0]);
    });
  });

  describe('Update', () => {
    test('Update Method', async () => {
      const result = await UserController.update(updatePutUserDTO, 1);
      expect(result).toEqual(UserEntityList[0]);
    });

    test('UpdatePartial Method', async () => {
      const result = await UserController.updatePartial(updatePatchUserDTO, 1);
      expect(result).toEqual(UserEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('Delete Method', async () => {
      const result = await UserController.delete(1);
      expect(result).toEqual({ success: true });
    });
  });
});
