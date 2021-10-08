import {AddCourseScreen} from '@app/screens/courses/add-course.screen';
import {ViewCourseScreen} from '@app/screens/courses/view-course.screen';
import {Home} from '@app/screens/home';

// TYPES
export type RouteType = {
  id: string;
  name: string;
  component: React.ComponentType<any>;
  options?: any;
};

export type BottomNavRouteType = RouteType & {
  icon: string;
};

type RoutesType = {
  bottomNav: BottomNavRouteType[];
  stackNav: RouteType[];
};

// STACK NAV ROUTES
export const homeRoute: RouteType = {
  id: 'home',
  name: 'Home',
  component: Home,
  options: {headerShown: false},
};

export const addCourseRoute: RouteType = {
  id: 'add-course',
  name: 'Add Course',
  component: AddCourseScreen,
};

export const viewCourseRoute: RouteType = {
  id: 'view-courses',
  name: 'View Courses',
  component: ViewCourseScreen,
};

export const routes: RoutesType = {
  bottomNav: [],
  stackNav: [homeRoute, addCourseRoute, viewCourseRoute],
};
