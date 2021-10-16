import ProgramType from './program.type';
import CLOType from './clo.type';
import DbEntity from './db-entity.type';

type PLOType = DbEntity & {
  title: string;
  description: string;
  clos?: CLOType[];
  program?: ProgramType;
};

export default PLOType;
