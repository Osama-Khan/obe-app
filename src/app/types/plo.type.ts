import DbEntity from './db-entity.type';
import ObjectiveMapType from './objective-map.type';
import {ProgramPloType} from '.';

type PLOType = DbEntity & {
  title: string;
  description: string;
  passing: number;
  maps?: ObjectiveMapType[];
  programMaps?: ProgramPloType[];
};

export default PLOType;
