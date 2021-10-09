import CourseType from './course.type';
import DbEntity from './db-entity.type';

type ProgramType = DbEntity & {
  title: string;
  courses?: CourseType[];
};

export default ProgramType;
