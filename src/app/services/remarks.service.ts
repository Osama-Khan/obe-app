import {RemarksType} from '@app/types/remarks.type';
import CrudService from './crud.service';

class RemarksService extends CrudService<RemarksType> {
  constructor() {
    super('remarks');
  }
}

export default new RemarksService();
