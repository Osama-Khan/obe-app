import {LoginScreen} from '@app/screens/auth/login.screen';
import {AddCourseScreen, ViewCourseScreen} from '@app/screens/course';
import {Home} from '@app/screens/home';
import {AddProgramScreen, ViewProgramScreen} from '@app/screens/program';
import {AddUserScreen, ViewUserScreen} from '@app/screens/user';

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
export const loginRoute: RouteType = {
  id: 'login',
  name: 'Login',
  component: LoginScreen,
};
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

export const addProgramRoute: RouteType = {
  id: 'add-program',
  name: 'Add Program',
  component: AddProgramScreen,
};

export const viewProgramRoute: RouteType = {
  id: 'view-programs',
  name: 'View Programs',
  component: ViewProgramScreen,
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
    loginRoute,
    homeRoute,
    addCourseRoute,
    viewCourseRoute,
    addProgramRoute,
    viewProgramRoute,
    addUserRoute,
    viewUsersRoute,
  ],
};
