import {ActivityTypeType, AssessmentType, CLOType} from '@app/types';
import {ViewProps} from 'react-native';

export type WeightComponentPropType = ViewProps & {
  clos: CLOType[];
  types: ActivityTypeType[];
  assessments: AssessmentType[];
};
