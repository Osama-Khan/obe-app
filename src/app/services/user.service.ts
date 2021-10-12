import UserType from '@app/types/user.type';
import axios from 'axios';
import CrudService from './crud.service';

class UserService extends CrudService<UserType> {
  constructor() {
    super('user');
  }

  login(data: {username: string; password: string; remember?: boolean}) {
    const {remember, ...user} = data;
    if (remember) {
      //TODO: Store token
    }
    return axios.post(this.endpoint + '/login', user);
  }
}

export default new UserService();
