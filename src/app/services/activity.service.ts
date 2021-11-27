import {ActivityType} from '@app/types';
import axios from 'axios';
import CrudService from './crud.service';

class ActivityService extends CrudService<ActivityType> {
  constructor() {
    super('activity');
  }

  /** Gets all activity types */
  getTypes() {
    return axios.post(this.endpoint + '-type');
  }
}

export default new ActivityService();
