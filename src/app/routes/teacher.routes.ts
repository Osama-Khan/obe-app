import {Home} from '@app/screens/teacher';
import {AddActivityScreen, AllocationDetailScreen} from '@app/screens/teacher';
import {RouteType} from '@app/types/route.type';

export const homeRoute: RouteType = {
  id: 'home',
  name: 'Home',
  component: Home,
};

export const allocationDetailRoute: RouteType = {
  id: 'allocation',
  name: 'Allocation',
  component: AllocationDetailScreen,
};

export const addActivityRoute: RouteType = {
  id: 'add-activity',
  name: 'Add Exam',
  component: AddActivityScreen,
};

export default [homeRoute, allocationDetailRoute, addActivityRoute];
