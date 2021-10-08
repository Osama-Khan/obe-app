import CourseType from './course.type';
import DbEntity from './db-entity.type';

type ProgramType = DbEntity & {
  name: string;
  courses?: CourseType[];
};

export default ProgramType;
