import { UserService } from '../user/user.service';
import { UserEntityList } from './user.entiry.list.mock';

export const UserServiceMock = {
  provide: UserService,
  useValue: {
    show: jest.fn().mockResolvedValue(UserEntityList[0]),
    create: jest.fn().mockResolvedValue(UserEntityList[0]),
    list: jest.fn().mockResolvedValue(UserEntityList),
    update: jest.fn().mockResolvedValue(UserEntityList[0]),
    updatePartial: jest.fn().mockResolvedValue(UserEntityList[0]),
    delete: jest.fn().mockResolvedValue(true),
    exists: jest.fn().mockResolvedValue(true),
  },
};
