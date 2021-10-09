import DbEntity from './db-entity.type';
import ProgramType from './program.type';

type CourseType = DbEntity & {
  title: string;
  code: string;
  programs?: ProgramType[];
};

export default CourseType;
