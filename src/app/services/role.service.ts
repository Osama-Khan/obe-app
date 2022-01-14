import {RoleType} from '@app/types';
import CrudService from './crud.service';

class RoleService extends CrudService<RoleType> {
  constructor() {
    super('role');
  }
}

export default new RoleService();
