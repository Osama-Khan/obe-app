import CourseType, {CourseWithActionType} from '@app/types/course.type';
import axios, {AxiosResponse} from 'axios';
import CrudService from './crud.service';

class CourseService extends CrudService<CourseType> {
  constructor() {
    super('course');
  }

  /** Gets list of courses with booleans representing if attention is required
   * @param id ID of program to fetch courses of
   */
  getWithActions(id: string): Promise<AxiosResponse<CourseWithActionType[]>> {
    return axios.get(`${this.endpoint}/with-actions/${id}`);
  }

  /** Sets Abstract Mapping for a course
   * @param id ID of the course
   * @param plos List of plo IDs
   */
  addAbstractMapping(id: string, plos: string[]) {
    return axios.put(`${this.endpoint}/${id}/abstract-mapping`, plos);
  }
}

export default new CourseService();
