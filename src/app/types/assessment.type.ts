import {ActivityTypeType} from './activity.type';
import AllocationType from './allocation.type';
import CLOType from './clo.type';
import DbEntity from './db-entity.type';

type AssessmentType = DbEntity & {
  /** The Allocation this assessment is for */
  allocation: AllocationType;

  /** The activity type this assessment is for */
  type: ActivityTypeType;

  /** Weight of the activity type on the CLO */
  weight: number;

  /** The CLO hit by the activity type allocation */
  clo: CLOType;
};

export default AssessmentType;
