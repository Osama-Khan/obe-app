import CourseType from '@app/types/course.type';
import axios from 'axios';
import CrudService from './crud.service';

class CourseService extends CrudService<CourseType> {
  constructor() {
    super('course');
  }

  uploadAllocationFile(b64: string) {
    const url = [this.endpoint, 'allocation/upload'].join('/');
    return axios.post(url, {file: b64});
  }
}

export default new CourseService();
