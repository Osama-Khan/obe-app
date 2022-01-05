import {ResultType} from '@app/types';
import UserType from '@app/types/user.type';
import axios, {AxiosResponse} from 'axios';
import CrudService from './crud.service';

class UserService extends CrudService<UserType> {
  constructor() {
    super('user');
  }

  /**
   * Returns result of the student
   * @param id ID of the student
   * @returns Result represented by percentage obtained in PLOs
   */
  getResults(id: string): Promise<AxiosResponse<ResultType[]>> {
    return axios.get(`${this.endpoint}/${id}/result`);
  }

  /**
   * Returns detailed result of the student
   * @param id ID of the student
   * @param ploId ID of the plo
   * @returns Result object containing detailed evaluations
   */
  getResultDetail(id: string, ploId: string) {
    return axios.get(`${this.endpoint}/${id}/result/plo/${ploId}`);
  }
}

export default new UserService();
