import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entity/user.entity';

export const UserEntityList: UserEntity[] = [
  {
    name: 'Teste 1',
    email: 'teste1@email.com',
    birthAt: new Date('2000-01-01'),
    id: 1,
    password: '$2b$10$IC/sxkfN9EawaZanKVEHMu/nERmV/dQAM8Gyit5jdWULDKLfNtgpW',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Teste 2',
    email: 'teste2@email.com',
    birthAt: new Date('2000-01-01'),
    id: 2,
    password: '$2b$10$IC/sxkfN9EawaZanKVEHMu/nERmV/dQAM8Gyit5jdWULDKLfNtgpW',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Teste 3',
    email: 'teste3@email.com',
    birthAt: new Date('2000-01-01'),
    id: 3,
    password: '$2b$10$IC/sxkfN9EawaZanKVEHMu/nERmV/dQAM8Gyit5jdWULDKLfNtgpW',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
