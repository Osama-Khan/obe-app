import {SectionType} from '@app/types';
import CrudService from './crud.service';

class SectionService extends CrudService<SectionType> {
  constructor() {
    super('section');
  }
}

export default new SectionService();
