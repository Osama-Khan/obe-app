import {PLOType} from '@app/types';
import CrudService from './crud.service';

class PLOService extends CrudService<PLOType> {
  constructor() {
    super('plo');
  }
}

export default new PLOService();
