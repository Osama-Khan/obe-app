import {LoginScreen} from '@app/screens/auth';
import {RouteType} from '@app/types/route.type';

export const loginRoute: RouteType = {
  id: 'login',
  name: 'Login',
  options: {
    headerTitle: 'BIIT OBE',
  },
  component: LoginScreen,
};

export default [loginRoute];
