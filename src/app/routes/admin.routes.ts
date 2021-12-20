import {AddUserScreen, ViewUserScreen, Home} from '@app/screens/admin';
import UserDetailScreen from '@app/screens/admin/user/detail-user.screen';
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

export const userDetailRoute: RouteType = {
  id: 'user-detail',
  name: 'User Detail',
  component: UserDetailScreen,
};

export default [homeRoute, addUserRoute, viewUsersRoute, userDetailRoute];
