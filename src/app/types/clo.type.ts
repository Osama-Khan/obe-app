import {ActivityMapType} from './activity.type';
import CourseType from './course.type';
import DbEntity from './db-entity.type';
import ObjectiveMapType from './objective-map.type';

type CLOType = DbEntity & {
  title: string;
  description: string;
  number: number;
  maps?: ObjectiveMapType[];
  activityMaps: ActivityMapType[];
  course?: CourseType;
};

export default CLOType;
