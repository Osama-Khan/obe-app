import {
  AddActivityScreen,
  AddCloScreen,
  AllocationDetailScreen,
  EvaluationScreen,
  FCARScreen,
  Home,
} from '@app/screens/teacher';
import {RouteType} from '@app/types/route.type';
import {
  evaluationDetailRoute,
  manageAssessmentRoute,
  studentResultsRoute,
  transcriptCourseRoute,
  transcriptPLORoute,
  transcriptRoute,
} from './shared.routes';

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

export const fcarRoute: RouteType = {
  id: 'fcar',
  name: 'FCAR',
  component: FCARScreen,
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
  transcriptRoute,
  transcriptPLORoute,
  transcriptCourseRoute,
  fcarRoute,
];
