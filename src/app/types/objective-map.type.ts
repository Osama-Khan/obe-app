import PLOType from './plo.type';
import CLOType from './clo.type';
import DbEntity from './db-entity.type';

type ObjectiveMapType = DbEntity & {
  clo?: Partial<CLOType>;
  plo?: Partial<PLOType>;
  weight: number;
};

export default ObjectiveMapType;
