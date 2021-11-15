import store from '@app/store';
import {userActions} from '@app/store/actions';
import {UserType} from '@app/types';
import axios, {AxiosResponse} from 'axios';
import ApiService from './api.service';
import storageService from './storage.service';

type AuthResponseType = AxiosResponse<UserType & {token: string}>;
class AuthService extends ApiService {
  endpoint = [this.domain, 'auth'].join('/');

  async login(data: {username: string; password: string; remember?: boolean}) {
    const {remember, ...user} = data;
    const res: AuthResponseType = await axios.post(
      this.endpoint + '/login',
      user,
    );
    if (remember) {
      storageService.setToken(res.data.token);
    }
    return res;
  }

  async loginWithToken() {
    const token = await storageService.getToken();
    if (token) {
      const res: AuthResponseType = await axios.post(this.endpoint + '/token', {
        token,
      });
      res.data.token = token;
      return res;
    }
    return false;
  }

  logout() {
    store.dispatch(userActions.clearUser());
    storageService.clearToken();
  }
}

export default new AuthService();
