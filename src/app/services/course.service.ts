import CourseType from '@app/types/course.type';
import axios, {AxiosResponse} from 'axios';
import CrudService from './crud.service';

class CourseService extends CrudService<CourseType> {
  constructor() {
    super('course');
  }

  /** Gets list of courses with booleans representing if attention is required
   * @param id ID of program to fetch courses of
   */
  getWithActions(id: string): Promise<
    AxiosResponse<
      (CourseType & {
        needsPlos: boolean;
        needsClos: boolean;
        needsAssessment: boolean;
      })[]
    >
  > {
    return axios.get(`${this.endpoint}/with-actions/${id}`);
  }
}

export default new CourseService();
