import {StackNavigationOptions} from '@react-navigation/stack';

// TYPES
export type RouteType = {
  id: string;
  name: string;
  component: React.ComponentType<any>;
  options?: StackNavigationOptions;
};
