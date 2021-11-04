import {DefaultTheme as PaperDefault} from 'react-native-paper';
import {
  DefaultTheme as NavDefault,
  Theme as NavTheme,
} from '@react-navigation/native';
import {Theme as PaperTheme} from 'react-native-paper/lib/typescript/types';
import colors from './colors';

const theme: PaperTheme = {
  ...PaperDefault,
  colors: {
    ...PaperDefault.colors,
    ...colors,
  },
};

const navTheme: NavTheme = {
  ...NavDefault,
  colors: {
    ...NavDefault.colors,
    primary: colors.primary,
    card: colors.primary,
    text: '#fff',
  },
};

export {theme, navTheme};
