import {AssessmentType} from '@app/types';
import CrudService from './crud.service';

class AssessmentService extends CrudService<AssessmentType> {
  constructor() {
    super('assessment');
  }
}

export default new AssessmentService();
