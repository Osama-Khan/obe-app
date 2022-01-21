import {
  AllocationScreen,
  AddProgramScreen,
  EditProgramScreen,
  ViewProgramScreen,
  Home,
  UploadAllocationScreen,
  AddCourseScreen,
  EditCourseScreen,
  ViewCoursesScreen,
  ViewClosScreen,
  EditCloScreen,
  ViewPlosScreen,
  PLOMappingsScreen,
  SectionsScreen,
  SectionDetailScreen,
  AbstractMappingScreen,
  AssessmentScreen,
} from '@app/screens/hod';
import {RouteType} from '@app/types/route.type';
import {
  evaluationDetailRoute,
  manageAssessmentRoute,
  studentResultsRoute,
} from './shared.routes';

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

export const addCourseRoute: RouteType = {
  id: 'ad-course',
  name: 'Add Course',
  component: AddCourseScreen,
};

export const editCourseRoute: RouteType = {
  id: 'edit-course',
  name: 'Edit Course',
  component: EditCourseScreen,
};

export const viewClosRoute: RouteType = {
  id: 'view-clos',
  name: 'Course CLOs',
  component: ViewClosScreen,
};

export const abstractMappingRoute: RouteType = {
  id: 'abstract-mapping',
  name: 'Abstract Mapping',
  component: AbstractMappingScreen,
};

export const editCloRoute: RouteType = {
  id: 'edit-clo',
  name: 'Edit CLO',
  component: EditCloScreen,
};

export const allocationRoute: RouteType = {
  id: 'allocation',
  name: 'Allocations',
  component: AllocationScreen,
};

export const allocationUploadRoute: RouteType = {
  id: 'allocation-upload',
  name: 'Upload Allocation',
  component: UploadAllocationScreen,
};

export const sectionsRoute: RouteType = {
  id: 'sections',
  name: 'Sections',
  component: SectionsScreen,
};

export const sectionDetailRoute: RouteType = {
  id: 'section-detail',
  name: 'Section Detail',
  component: SectionDetailScreen,
};

export const assessmentRoute: RouteType = {
  id: 'assessment',
  name: 'Assessment',
  component: AssessmentScreen,
};

export default [
  homeRoute,
  addProgramRoute,
  allocationRoute,
  allocationUploadRoute,
  editProgramRoute,
  viewProgramRoute,
  programPlosRoute,
  ploMappingsRoute,
  addCourseRoute,
  editCourseRoute,
  programCoursesRoute,
  viewClosRoute,
  abstractMappingRoute,
  editCloRoute,
  studentResultsRoute,
  sectionsRoute,
  sectionDetailRoute,
  evaluationDetailRoute,
  assessmentRoute,
  manageAssessmentRoute,
];
