import AllocationScreen from '@app/screens/allocation';
import {LoginScreen} from '@app/screens/auth/login.screen';
import {
  AddCourseScreen,
  ViewCourseScreen,
  EditCourseScreen,
} from '@app/screens/course';
import {Home} from '@app/screens/home';
import {
  AddProgramScreen,
  EditProgramScreen,
  ViewProgramScreen,
} from '@app/screens/program';
import {AddUserScreen, ViewUserScreen} from '@app/screens/user';
import {StackNavigationOptions} from '@react-navigation/stack';

// TYPES
export type RouteType = {
  id: string;
  name: string;
  component: React.ComponentType<any>;
  options?: StackNavigationOptions;
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
};

export const addCourseRoute: RouteType = {
  id: 'add-course',
  name: 'Add Course',
  component: AddCourseScreen,
};

export const editCourseRoute: RouteType = {
  id: 'edit-course',
  name: 'Edit Course',
  component: EditCourseScreen,
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

export const editProgramRoute: RouteType = {
  id: 'edit-program',
  name: 'Edit Program',
  component: EditProgramScreen,
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

export const allocationRoute: RouteType = {
  id: 'allocation',
  name: 'Allocate Courses',
  component: AllocationScreen,
};

export const routes: RoutesType = {
  bottomNav: [],
  stackNav: [
    loginRoute,
    homeRoute,
    addCourseRoute,
    editCourseRoute,
    viewCourseRoute,
    addProgramRoute,
    editProgramRoute,
    viewProgramRoute,
    addUserRoute,
    viewUsersRoute,
    allocationRoute,
  ],
};
