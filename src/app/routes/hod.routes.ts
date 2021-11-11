import {
  AllocationScreen,
  AddCourseScreen,
  ViewCourseScreen,
  EditCourseScreen,
  AddProgramScreen,
  EditProgramScreen,
  ViewProgramScreen,
  Home,
} from '@app/screens/hod';
import {RouteType} from '@app/types/route.type';

export const homeRoute: RouteType = {
  id: 'home',
  name: 'HOD Panel',
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

export const allocationRoute: RouteType = {
  id: 'allocation',
  name: 'Allocate Courses',
  component: AllocationScreen,
};

export default [
  homeRoute,
  addCourseRoute,
  editCourseRoute,
  viewCourseRoute,
  addProgramRoute,
  editProgramRoute,
  viewProgramRoute,
  allocationRoute,
];
