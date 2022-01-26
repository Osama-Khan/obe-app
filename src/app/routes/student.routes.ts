import {Home} from '@app/screens/student';
import {RouteType} from '@app/types/route.type';
import {evaluationDetailRoute, transcriptRoute} from './shared.routes';

export const homeRoute: RouteType = {
  id: 'home',
  name: 'Home',
  component: Home,
  options: {
    headerShown: false,
  },
};

export default [homeRoute, evaluationDetailRoute, transcriptRoute];
