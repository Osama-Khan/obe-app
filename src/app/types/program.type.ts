import {ProgramPloType} from '.';
import CourseType from './course.type';
import DbEntity from './db-entity.type';
import SectionType from './section.type';

type ProgramType = DbEntity & {
  title: string;
  courses?: CourseType[];
  ploMaps?: ProgramPloType[];
  sections: SectionType[];
};

export default ProgramType;
