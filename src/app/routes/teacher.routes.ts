import {Home} from '@app/screens/teacher';
import AllocationDetail from '@app/screens/teacher/allocation';
import AddActivityScreen from '@app/screens/teacher/allocation/activities/add-activity.screen';
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

export const addActivityRoute: RouteType = {
  id: 'add-activity',
  name: 'Add Exam',
  component: AddActivityScreen,
};

export default [homeRoute, allocationDetailRoute, addActivityRoute];
