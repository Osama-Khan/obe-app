import {DefaultTheme as PaperDefault} from 'react-native-paper';
import {
  DefaultTheme as NavDefault,
  Theme as NavTheme,
} from '@react-navigation/native';
import {Theme as PaperTheme} from 'react-native-paper/lib/typescript/types';
import {appColors as colors} from './colors';

const theme: PaperTheme = {
  ...PaperDefault,
  colors: {
    ...PaperDefault.colors,
    ...colors,
  },
  roundness: 8,
};

const navTheme: NavTheme = {
  ...NavDefault,
  colors: {
    ...NavDefault.colors,
    ...colors,
    card: colors.primary,
    text: colors.textInverted,
  },
};

export {theme, navTheme};
