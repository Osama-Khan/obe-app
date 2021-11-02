import {Criteria, ManyCriteria} from '@app/models/criteria';
import axios, {AxiosResponse} from 'axios';
import ApiService from './api.service';

/** Provides basic CRUD API methods */
export default abstract class CrudService<Model> extends ApiService {
  /** @param endpoint The API endpoint of the entity */
  constructor(protected endpoint: string) {
    super();
    this.endpoint = [this.domain, this.endpoint].join('/');
  }

  /** Gets all items */
  get(criteria?: ManyCriteria<Model>): Promise<AxiosResponse<Model[]>> {
    return axios.post(this.endpoint, criteria?.body);
  }

  /** Gets one item */
  getOne(
    id: string,
    criteria?: Criteria<Model>,
  ): Promise<AxiosResponse<Model>> {
    return axios.post(`${this.endpoint}/${id}`, criteria?.body);
  }

  /** Sends a put request with the given data */
  insert(data: Partial<Model>) {
    return axios.put(this.endpoint, data);
  }

  /** Sends a patch request for the item corresponding to the given
   * id with the given data in body
   */
  update(id: string, data: Partial<Model>) {
    return axios.patch(`${this.endpoint}/${id}`, data);
  }

  /** Sends a delete request for the item */
  delete(id: string) {
    return axios.delete(`${this.endpoint}/${id}`);
  }
}
