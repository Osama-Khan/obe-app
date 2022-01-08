import {
  EvaluationDetailScreen,
  StudentResultsScreen,
} from '@app/screens/shared';
import {RouteType} from '@app/types/route.type';

export const studentResultsRoute: RouteType = {
  id: 'student-results',
  name: 'Student Results',
  component: StudentResultsScreen,
};

export const evaluationDetailRoute: RouteType = {
  id: 'evaluation-detail',
  name: 'Evaluation Detail',
  component: EvaluationDetailScreen,
  options: {
    headerTitle: '',
    headerShadowVisible: false,
  },
};
