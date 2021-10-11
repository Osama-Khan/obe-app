import axios from 'axios';
import ApiService from './api.service';

/** Provides basic CRUD API methods */
export default abstract class CrudService<Model> extends ApiService {
  /** @param endpoint The API endpoint of the entity */
  constructor(protected endpoint: string) {
    super();
    this.endpoint = [this.domain, this.endpoint].join('/');
  }

  /** Gets all items */
  get() {
    return axios.get(this.endpoint);
  }

  /** Gets one item */
  getOne(id: string) {
    return axios.get(`${this.endpoint}/${id}`);
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
