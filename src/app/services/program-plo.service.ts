import {ProgramPloType} from '@app/types';
import CrudService from './crud.service';

class ProgramPloService extends CrudService<ProgramPloType> {
  constructor() {
    super('program-plo-map');
  }
}

export default new ProgramPloService();
