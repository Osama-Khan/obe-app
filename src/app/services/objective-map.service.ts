import {ObjectiveMapType} from '@app/types';
import axios, {AxiosResponse} from 'axios';
import CrudService from './crud.service';

class ObjectiveMapService extends CrudService<ObjectiveMapType> {
  constructor() {
    super('objective-map');
  }

  /** Gets the maps for given program and course */
  getCourseMaps(
    pid: string,
    cid: string,
  ): Promise<AxiosResponse<ObjectiveMapType[]>> {
    return axios.get(`${this.endpoint}/program/${pid}/course/${cid}`);
  }
}

export default new ObjectiveMapService();
