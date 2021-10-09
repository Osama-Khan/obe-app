import {AddCourseScreen, ViewCourseScreen} from '@app/screens/course/';
import {Home} from '@app/screens/home';
import {AddUserScreen, ViewUserScreen} from '@app/screens/user/';

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

export const addUserRoute: RouteType = {
  id: 'add-user',
  name: 'Add User',
  component: AddUserScreen,
};

export const viewUsersRoute: RouteType = {
  id: 'view-users',
  name: 'View Users',
  component: ViewUserScreen,
};

export const routes: RoutesType = {
  bottomNav: [],
  stackNav: [
    homeRoute,
    addCourseRoute,
    viewCourseRoute,
    addUserRoute,
    viewUsersRoute,
  ],
};
