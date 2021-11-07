import {CLOType} from '@app/types';
import CrudService from './crud.service';

class CLOService extends CrudService<CLOType> {
  constructor() {
    super('clo');
  }
}

export default new CLOService();
