import {
  adminRoutes,
  authRoutes,
  studentRoutes,
  teacherRoutes,
  hodRoutes,
} from '@app/routes';

export const routes = {
  auth: authRoutes,
  admin: adminRoutes,
  hod: hodRoutes,
  teacher: teacherRoutes,
  student: studentRoutes,
};
