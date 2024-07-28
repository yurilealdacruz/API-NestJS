import { JwtService } from '@nestjs/jwt';
import { accessToken } from './acess.token.mock';
import { jwtPayload } from './jwt.payload.mock';

export const JwtServiceMock = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockReturnValue(accessToken),
    verify: jest.fn().mockReturnValue(jwtPayload),
  },
};
