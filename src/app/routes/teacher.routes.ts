import {Home} from '@app/screens/teacher';
import AllocationDetail from '@app/screens/teacher/allocation';
import {RouteType} from '@app/types/route.type';

export const homeRoute: RouteType = {
  id: 'home',
  name: 'Home',
  component: Home,
};

export const allocationDetailRoute: RouteType = {
  id: 'allocation',
  name: 'Allocation',
  component: AllocationDetail,
};

export default [homeRoute, allocationDetailRoute];
