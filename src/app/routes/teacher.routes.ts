import {
  AddActivityScreen,
  AddCloScreen,
  AllocationDetailScreen,
  EvaluationScreen,
  Home,
  ManageAssessmentScreen,
} from '@app/screens/teacher';
import {RouteType} from '@app/types/route.type';
import {evaluationDetailRoute, studentResultsRoute} from './shared.routes';

export const homeRoute: RouteType = {
  id: 'home',
  name: 'Home',
  component: Home,
};

export const allocationDetailRoute: RouteType = {
  id: 'allocation',
  name: 'Allocation',
  component: AllocationDetailScreen,
};

export const manageAssessmentRoute: RouteType = {
  id: 'manage-assessment',
  name: 'Manage Assessments',
  component: ManageAssessmentScreen,
};

export const addActivityRoute: RouteType = {
  id: 'add-activity',
  name: 'Add Exam',
  component: AddActivityScreen,
};

export const addCloRoute: RouteType = {
  id: 'add-clo',
  name: 'Add CLO',
  component: AddCloScreen,
};

export const evaluationRoute: RouteType = {
  id: 'evaluation',
  name: 'Evaluation',
  component: EvaluationScreen,
};

export default [
  homeRoute,
  allocationDetailRoute,
  manageAssessmentRoute,
  addActivityRoute,
  addCloRoute,
  evaluationRoute,
  studentResultsRoute,
  evaluationDetailRoute,
];
