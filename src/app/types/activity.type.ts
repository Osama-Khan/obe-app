import DbEntity from './db-entity.type';
import CLOType from './clo.type';
import UserType from './user.type';
import AllocationType from './allocation.type';
import QuestionType from './question.type';

export type ActivityTypeType = DbEntity & {
  /** Name of the activity type */
  name: string;

  /** The activities that are of this type */
  activities: ActivityType[];
};

export type ActivityMapType = DbEntity & {
  /** Percentage indicating how much of the CLO the activity fulfills */
  weight: number;

  /** The activity assigned to the CLO */
  activity: ActivityType;

  /** The CLO object mapped by the activity */
  clo: CLOType;
};

export type ActivityType = DbEntity & {
  /** Title of the activity */
  title: string;

  /** A bit longer description of the activity */
  description: string;

  /** Total marks obtainable in the activity */
  marks: number;

  /** Maps of this Activity with CLOs along with weights */
  maps: ActivityMapType[];

  /** Type of the activity */
  type: ActivityTypeType;

  /** Evaluations of the activity */
  evaluations?: EvaluationType[];

  /** The allocation this activity has been assigned to */
  allocation: AllocationType;

  /** Questions in the activity */
  questions?: QuestionType[];
};

export type EvaluationType = DbEntity & {
  /** Obtained Marks */
  marks: number;

  /** Activity this evaluation is for */
  activity?: ActivityType;

  /** Student this evaluation belongs to */
  user?: UserType;
};
