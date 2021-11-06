import UserType from './user.type';
import AllocationType from './allocation.type';
import ProgramType from './program.type';
import CourseType from './course.type';
import DbEntity from './db-entity.type';

type SectionType = DbEntity & {
  name: string;
  semester: number;
  program?: ProgramType;
  users?: UserType[];
  allocations?: AllocationType[];
};

export default SectionType;
