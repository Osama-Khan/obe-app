import ProgramType from '@app/types/program.type';
import CrudService from './crud.service';

class RoleService extends CrudService<ProgramType> {
  constructor() {
    super('role');
  }
}

export default new RoleService();
