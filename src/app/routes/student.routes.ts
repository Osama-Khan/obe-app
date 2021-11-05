import {Home} from '@app/screens/student';
import {RouteType} from '@app/types/route.type';

export const homeRoute: RouteType = {
  id: 'home',
  name: 'Home',
  component: Home,
};

export default [homeRoute];
