import CourseType from './course.type';
import DbEntity from './db-entity.type';
import PLOType from './plo.type';
import SectionType from './section.type';

type ProgramType = DbEntity & {
  title: string;
  courses?: CourseType[];
  plos?: PLOType[];
  sections: SectionType[];
};

export default ProgramType;
