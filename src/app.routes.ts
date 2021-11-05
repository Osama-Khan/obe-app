import {
  adminRoutes,
  authRoutes,
  studentRoutes,
  teacherRoutes,
} from '@app/routes';

export const routes = {
  auth: authRoutes,
  admin: adminRoutes,
  teacher: teacherRoutes,
  student: studentRoutes,
};
