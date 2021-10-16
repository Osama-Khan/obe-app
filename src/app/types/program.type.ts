import CourseType from './course.type';
import DbEntity from './db-entity.type';
import PLOType from './plo.type';

type ProgramType = DbEntity & {
  title: string;
  courses?: CourseType[];
  plos?: PLOType[];
};

export default ProgramType;
