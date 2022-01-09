import {ActivityType} from './activity.type';
import CLOType from './clo.type';
import DbEntity from './db-entity.type';

type QuestionType = DbEntity & {
  /** Title of the question */
  title: string;

  /** Activity this question is in */
  activity?: ActivityType;

  /** CLOs this question hits */
  clos?: CLOType[];
};

export default QuestionType;
