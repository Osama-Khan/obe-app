import {Home} from '@app/screens/student';
import {EvaluationDetailScreen} from '@app/screens/student/evaluation-detail';
import {RouteType} from '@app/types/route.type';

export const homeRoute: RouteType = {
  id: 'home',
  name: 'Home',
  component: Home,
  options: {
    headerShown: false,
  },
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

export default [homeRoute, evaluationDetailRoute];
