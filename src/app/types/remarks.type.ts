import {CourseType, SectionType, UserType} from '.';
import DbEntity from './db-entity.type';

export type RemarksType = DbEntity & {
  student: UserType;
  teacher: UserType;
  section: SectionType;
  course: CourseType;
  text: string;
};
