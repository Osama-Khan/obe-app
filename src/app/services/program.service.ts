import ProgramType from '@app/types/program.type';
import CrudService from './crud.service';

class ProgramService extends CrudService<ProgramType> {
  constructor() {
    super('program');
  }
}

export default new ProgramService();
