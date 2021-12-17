import {
  AllocationScreen,
  AddProgramScreen,
  EditProgramScreen,
  ViewProgramScreen,
  Home,
  UploadAllocationScreen,
} from '@app/screens/hod';
import {AllocationDetailScreen} from '@app/screens/hod/allocation/detail-allocation.screen';
import ProgramCoursesScreen from '@app/screens/hod/program/courses';
import {
  ViewClosScreen,
  AddCloScreen,
} from '@app/screens/hod/program/courses/clos';
import ProgramPlosScreen from '@app/screens/hod/program/plos';
import {RouteType} from '@app/types/route.type';

export const homeRoute: RouteType = {
  id: 'home',
  name: 'HOD Panel',
  component: Home,
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

export const programPlosRoute: RouteType = {
  id: 'program-plos',
  name: 'Program PLOs',
  component: ProgramPlosScreen,
};

export const programCoursesRoute: RouteType = {
  id: 'program-courses',
  name: 'Program Courses',
  component: ProgramCoursesScreen,
};

export const viewClosRoute: RouteType = {
  id: 'view-clos',
  name: 'Course CLOs',
  component: ViewClosScreen,
};

export const addCloRoute: RouteType = {
  id: 'add-clo',
  name: 'Add CLO',
  component: AddCloScreen,
};

export const allocationRoute: RouteType = {
  id: 'allocation',
  name: 'Allocations',
  component: AllocationScreen,
};

export const allocationDetailRoute: RouteType = {
  id: 'allocation-detail',
  name: 'Allocation Detail',
  component: AllocationDetailScreen,
};

export const allocationUploadRoute: RouteType = {
  id: 'allocation-upload',
  name: 'Upload Allocation',
  component: UploadAllocationScreen,
};

export default [
  homeRoute,
  addProgramRoute,
  editProgramRoute,
  viewProgramRoute,
  programPlosRoute,
  programCoursesRoute,
  viewClosRoute,
  addCloRoute,
];
