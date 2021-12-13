import ProgramType from './program.type';
import DbEntity from './db-entity.type';
import PLOType from './plo.type';

type ProgramPloType = DbEntity & {
  number: number;
  plo?: PLOType;
  program?: ProgramType;
};

export default ProgramPloType;
