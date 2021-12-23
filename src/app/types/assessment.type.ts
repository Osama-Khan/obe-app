import CourseType from './course.type';
import {ActivityTypeType} from './activity.type';
import CLOType from './clo.type';
import DbEntity from './db-entity.type';

type AssessmentType = DbEntity & {
  /** The Course this assessment is for */
  course: CourseType;

  /** The activity type this assessment is for */
  type: ActivityTypeType;

  /** Weight of the activity type on the CLO */
  weight: number;

  /** The CLO hit by the activity type allocation */
  clo: CLOType;
};

export default AssessmentType;
