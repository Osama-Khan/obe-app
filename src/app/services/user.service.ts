import UserType from '@app/types/user.type';
import axios from 'axios';
import CrudService from './crud.service';

class UserService extends CrudService<UserType> {
  constructor() {
    super('user');
  }

  login(data: {username: string; password: string}) {
    return axios.post(this.endpoint + '/login', data);
  }
}

export default new UserService();
