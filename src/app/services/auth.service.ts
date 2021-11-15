import axios from 'axios';
import ApiService from './api.service';

class AuthService extends ApiService {
  endpoint = [this.domain, 'auth'].join('/');

  login(data: {username: string; password: string; remember?: boolean}) {
    const {remember, ...user} = data;
    if (remember) {
      //TODO: Store token
    }
    return axios.post(this.endpoint + '/login', user);
  }
}

export default new AuthService();
