import { AuthenticationService } from '../authentication.service';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { mockedConfigService } from 'src/utils/mocks/config.service';
import { mockedJwtService } from 'src/utils/mocks/jwt.service';
import { User } from 'src/users/user.entity';

describe('The AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthenticationService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();
    authenticationService = await module.get(AuthenticationService);
  });
  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = '0503739d-09db-497c-b269-d2dec2be5485';
      expect(
        typeof authenticationService.getCookieWithJwtToken(userId),
      ).toEqual('string');
    });
  });
});
