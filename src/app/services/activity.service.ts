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

  /** Gets CLOs with their cumulative weights in given allocation
   * @param id ID of the allocation
   */
  getCloWeightsInAllocation(id: string) {
    return axios.get(`${this.endpoint}/maps/${id}`);
  }

  /** Gets number of activity for given allocation grouped by type
   * @param id ID of the allocation
   * @returns Number of activities grouped by type in the given allocation
   */
  getActivityTypeCounts(id: string) {
    return axios.get(`${this.endpoint}/allocation-type-count/${id}`);
  }

  /** Sets evaluations for an activity */
  setEvaluation(
    activityId: string,
    evaluations: {user: {id: string}; marks: number}[],
  ) {
    return axios.put(`${this.endpoint}/${activityId}/evaluations`, evaluations);
  }
}

export default new ActivityService();
