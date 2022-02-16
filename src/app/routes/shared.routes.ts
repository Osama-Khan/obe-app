import {
  EvaluationDetailScreen,
  ManageAssessmentScreen,
  StudentResultsScreen,
  TranscriptScreen,
} from '@app/screens/shared';
import TranscriptCourseScreen from '@app/screens/shared/transcript/course-detail.screen';
import TranscriptPLOScreen from '@app/screens/shared/transcript/plo-detail.screen';
import {RouteType} from '@app/types/route.type';

export const studentResultsRoute: RouteType = {
  id: 'student-results',
  name: 'Student Results',
  component: StudentResultsScreen,
};

export const evaluationDetailRoute: RouteType = {
  id: 'evaluation-detail',
  name: 'Evaluation Detail',
  component: EvaluationDetailScreen,
  options: {
    headerTitle: '',
    headerShadowVisible: false,
  },
};

export const manageAssessmentRoute: RouteType = {
  id: 'manage-assessment',
  name: 'Manage Assessments',
  component: ManageAssessmentScreen,
};

export const transcriptRoute: RouteType = {
  id: 'transcript',
  name: 'Transcript',
  component: TranscriptScreen,
};

export const transcriptCourseRoute: RouteType = {
  id: 'transcript-course',
  name: 'Transcript Course',
  component: TranscriptCourseScreen,
};

export const transcriptPLORoute: RouteType = {
  id: 'transcript-plo',
  name: 'Transcript PLO',
  component: TranscriptPLOScreen,
};
