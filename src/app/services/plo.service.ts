import {ObjectiveMapType, PLOType} from '@app/types';
import axios, {AxiosResponse} from 'axios';
import CrudService from './crud.service';

class PLOService extends CrudService<PLOType> {
  constructor() {
    super('plo');
  }

  /**
   * Gets PLO-CLO mappings of the specified PLO
   * @param id ID of the PLO to get mappings of
   * @returns Mappings of the PLO
   */
  getMappings(id: string): Promise<AxiosResponse<ObjectiveMapType[]>> {
    return axios.get(`${this.endpoint}/${id}/mappings`);
  }
}

export default new PLOService();
