import UserType from '@app/types/user.type';
import CrudService from './crud.service';

class UserService extends CrudService<UserType> {
  constructor() {
    super('user');
  }
}

export default new UserService();
