import CourseType from '@app/types/course.type';
import CrudService from './crud.service';

class CourseService extends CrudService<CourseType> {
  constructor() {
    super('course');
  }
}

export default new CourseService();
