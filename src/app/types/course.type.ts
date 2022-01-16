import AssessmentType from './assessment.type';
import AllocationType from './allocation.type';
import CLOType from './clo.type';
import DbEntity from './db-entity.type';
import ProgramType from './program.type';
import {PLOType} from '.';

type CourseType = DbEntity & {
  title: string;
  titleShort: string;
  id: string;
  theoryHours: number;
  labHours: number;
  programs?: ProgramType[];
  clos?: CLOType[];
  allocations?: AllocationType[];
  assessments?: AssessmentType[];
  plos: PLOType[];
};

export default CourseType;
