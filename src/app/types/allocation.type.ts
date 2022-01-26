import UserType from './user.type';
import CourseType from './course.type';
import DbEntity from './db-entity.type';
import SectionType from './section.type';
import {ActivityType} from './activity.type';

type AllocationType = DbEntity & {
  section?: SectionType;
  user?: UserType;
  course?: CourseType;
  activities?: ActivityType;
};

export default AllocationType;
