import {PLOType} from '@app/types';
import CrudService from './crud.service';

class ObjectiveMapService extends CrudService<PLOType> {
  constructor() {
    super('objective-map');
  }
}

export default new ObjectiveMapService();
