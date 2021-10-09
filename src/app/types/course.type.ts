import DbEntity from './db-entity.type';
import ProgramType from './program.type';

type CourseType = DbEntity & {
  title: string;
  programs?: ProgramType[];
};

export default CourseType;
