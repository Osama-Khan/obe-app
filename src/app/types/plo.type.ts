import DbEntity from './db-entity.type';
import ObjectiveMapType from './objective-map.type';
import {CourseType, ProgramPloType} from '.';

type PLOType = DbEntity & {
  title: string;
  description: string;
  passing: number;
  maps?: ObjectiveMapType[];
  programMaps?: ProgramPloType[];
  courses?: CourseType[];
};

export default PLOType;
