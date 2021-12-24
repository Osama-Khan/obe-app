import {ObjectiveMapType} from '@app/types';
import CrudService from './crud.service';

class ObjectiveMapService extends CrudService<ObjectiveMapType> {
  constructor() {
    super('objective-map');
  }
}

export default new ObjectiveMapService();
