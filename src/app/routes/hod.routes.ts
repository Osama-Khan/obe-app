import {
  AllocationScreen,
  AddProgramScreen,
  EditProgramScreen,
  ViewProgramScreen,
  Home,
  UploadAllocationScreen,
  AssessmentScreen,
  ViewCoursesScreen,
  ViewClosScreen,
  AddCloScreen,
  ViewPlosScreen,
  PLOMappingsScreen,
} from '@app/screens/hod';
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
  id: 'view-plos',
  name: 'View PLOs',
  component: ViewPlosScreen,
};

export const ploMappingsRoute: RouteType = {
  id: 'plo-mappings',
  name: 'PLO Mappings',
  component: PLOMappingsScreen,
};

export const programCoursesRoute: RouteType = {
  id: 'view-courses',
  name: 'View Courses',
  component: ViewCoursesScreen,
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

export const assessmentRoute: RouteType = {
  id: 'assessment',
  name: 'Assessment',
  component: AssessmentScreen,
};

export const allocationUploadRoute: RouteType = {
  id: 'allocation-upload',
  name: 'Upload Allocation',
  component: UploadAllocationScreen,
};

export default [
  homeRoute,
  addProgramRoute,
  allocationRoute,
  assessmentRoute,
  allocationUploadRoute,
  editProgramRoute,
  viewProgramRoute,
  programPlosRoute,
  ploMappingsRoute,
  programCoursesRoute,
  viewClosRoute,
  addCloRoute,
];
