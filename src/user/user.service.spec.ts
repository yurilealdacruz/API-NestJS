import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { userRepositoryMock } from '../testing/user.repository.mock';
import { UserEntityList } from '../testing/user.entiry.list.mock';
import { createUserDTO } from '../testing/create.user.dto.mock';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { updatePutUserDTO } from '../testing/update.put.user.mock';
import { updatePatchUserDTO } from '../testing/update.pat.user.mock';

describe('UserService', () => {
  let userService: UserService;
  let UserRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    UserRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  test('Validar a definição', () => {
    expect(userService).toBeDefined;
    expect(UserRepository).toBeDefined;
  });

  describe('Create', () => {
    test('methord Create', async () => {
      jest.spyOn(UserRepository, 'exists').mockResolvedValueOnce(false);
      const result = await userService.create(createUserDTO);
      expect(result).toEqual(UserEntityList[0]);
    });
  });

  describe('Read', () => {
    test('methord List', async () => {
      const result = await userService.list();
      expect(result).toEqual(UserEntityList);
    });

    test('methord Show', async () => {
      const result = await userService.show(1);
      expect(result).toEqual(UserEntityList[0]);
    });
  });
  describe('Update', () => {
    test('methord Update', async () => {
      const result = await userService.update(1, updatePutUserDTO);
      expect(result).toEqual(UserEntityList[0]);
    });
    test('methord UpdatePartial', async () => {
      const result = await userService.updatePartial(1, updatePatchUserDTO);
      expect(result).toEqual(UserEntityList[0]);
    });
  });
  describe('Delete', () => {
    test('methord Delete', async () => {
      const result = await userService.delete(1);
      expect(result).toEqual(true);
    });
  });
});
