import ProgramType from './program.type';
import DbEntity from './db-entity.type';
import ObjectiveMapType from './objective-map.type';

type PLOType = DbEntity & {
  title: string;
  description: string;
  maps?: ObjectiveMapType[];
  program?: ProgramType;
};

export default PLOType;
