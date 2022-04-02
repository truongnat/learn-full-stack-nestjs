import { AuthenticationService } from './../../authentication/authentication.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../../users/users.service';
import { User } from '../user.entity';

describe('The UsersService', () => {
  let usersService: UsersService;
  let authenticationService: AuthenticationService;
  let findOne: jest.Mock;
  beforeEach(async () => {
    findOne = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne,
          },
        },
      ],
    }).compile();
    usersService = await module.get(UsersService);
  });
  describe('when getting a user by email', () => {
    describe('and the user is matched', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOne.mockReturnValue(Promise.resolve(user));
      });
      it('should return the user', async () => {
        const fetchedUser = await usersService.getByEmail('test@test.com');
        expect(fetchedUser).toEqual(user);
      });
    });
    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      });
      it('should throw an error', async () => {
        await expect(
          usersService.getByEmail('truongdq.dev111@gmail.com'),
        ).rejects.toThrow();
      });
    });

    describe('when accessing the data of authenticating user', async () => {
      it('should attempt to get the user by email', async () => {
        const getByEmailSpy = jest.spyOn(usersService, 'getByEmail');
        await authenticationService.getAuthenticatedUser(
          'truongdq.dev111@gmail.com',
          'ahihi1234',
        );
        expect(getByEmailSpy).toBeCalledTimes(1);
      });
    });
  });
});
