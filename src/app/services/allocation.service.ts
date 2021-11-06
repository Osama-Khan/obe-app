import {AllocationType} from '@app/types';
import axios from 'axios';
import CrudService from './crud.service';

class AllocationService extends CrudService<AllocationType> {
  constructor() {
    super('allocation');
  }

  uploadAllocationFile(b64: string) {
    const url = [this.endpoint, 'upload'].join('/');
    return axios.post(url, {file: b64});
  }
}

export default new AllocationService();
