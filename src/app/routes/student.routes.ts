import {Home} from '@app/screens/student';
import {EvaluationDetailScreen} from '@app/screens/student/evaluation-detail';
import {RouteType} from '@app/types/route.type';

export const homeRoute: RouteType = {
  id: 'home',
  name: 'Home',
  component: Home,
};

export const evaluationDetailRoute: RouteType = {
  id: 'evaluation-detail',
  name: 'Evaluation Detail',
  component: EvaluationDetailScreen,
};

export default [homeRoute, evaluationDetailRoute];
