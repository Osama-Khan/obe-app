import PLOType from './plo.type';
import CLOType from './clo.type';
import DbEntity from './db-entity.type';
import ProgramType from './program.type';

type ObjectiveMapType = DbEntity & {
  clo?: Partial<CLOType>;
  plo?: Partial<PLOType>;
  weight: number;
  program?: Partial<ProgramType>;
};

export default ObjectiveMapType;
