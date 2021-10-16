import CLOType from './clo.type';
import DbEntity from './db-entity.type';
import ProgramType from './program.type';

type CourseType = DbEntity & {
  title: string;
  code: string;
  programs?: ProgramType[];
  clos?: CLOType[];
};

export default CourseType;
