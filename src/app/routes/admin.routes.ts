import {AddUserScreen, ViewUserScreen, Home} from '@app/screens/admin';
import {RouteType} from '@app/types/route.type';

export const homeRoute: RouteType = {
  id: 'home',
  name: 'Admin Panel',
  component: Home,
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

export default [homeRoute, addUserRoute, viewUsersRoute];
