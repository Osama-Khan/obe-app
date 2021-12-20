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

  /** Gets CLOs with their cumulative weights in given section
   * @param id ID of the section
   */
  getCloWeightsInSection(id: string) {
    return axios.get(`${this.endpoint}/maps/${id}`);
  }

  /** Gets number of activity for given section grouped by type
   * @param id ID of the section
   * @returns Number of activities grouped by type in the given section
   */
  async getActivityTypeCounts(id: string) {
    return axios.get(`${this.endpoint}/section-type-count/${id}`);
  }
}

export default new ActivityService();
