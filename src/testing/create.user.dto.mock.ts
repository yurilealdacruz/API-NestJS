import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create-user.dto';

export const createUserDTO: CreateUserDTO = {
  birthAt: '2000-01-01',
  email: 'teste@email.com',
  name: 'Teste 123',
  password: '123456',
  role: Role.User,
};
