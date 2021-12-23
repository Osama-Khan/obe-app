import AssessmentType from './assessment.type';
import AllocationType from './allocation.type';
import CLOType from './clo.type';
import DbEntity from './db-entity.type';
import ProgramType from './program.type';

type CourseType = DbEntity & {
  title: string;
  code: string;
  creditHours: number;
  programs?: ProgramType[];
  clos?: CLOType[];
  allocations?: AllocationType[];
  assessments?: AssessmentType[];
};

export default CourseType;
