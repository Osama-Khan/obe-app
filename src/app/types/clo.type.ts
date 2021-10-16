import CourseType from './course.type';
import DbEntity from './db-entity.type';
import PLOType from './plo.type';

type CLOType = DbEntity & {
  title: string;
  description: string;
  plos?: PLOType[];
  course?: CourseType;
};

export default CLOType;
