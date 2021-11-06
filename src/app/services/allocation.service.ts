import axios from 'axios';
import CrudService from './crud.service';

class AllocationService extends CrudService<any> {
  constructor() {
    super('allocation');
  }
}

export default new AllocationService();
