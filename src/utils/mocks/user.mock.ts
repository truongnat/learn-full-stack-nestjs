import { User } from 'src/users/user.entity';

export const mockedUser: User = {
  id: '0503739d-09db-497c-b269-d2dec2be5485',
  email: 'user@email.com',
  name: 'John',
  password: 'hash',
  address: {
    id: '316888f1-4228-4f74-819c-20e983d295e8',
    street: 'streetName',
    city: 'cityName',
    country: 'countryName',
    user: {} as User,
  },
  posts: [],
};
