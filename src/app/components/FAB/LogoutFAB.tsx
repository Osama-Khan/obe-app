import authService from '@app/services/auth.service';
import {colors} from '@app/styles';
import React from 'react';
import {FAB} from 'react-native-paper';

export default function LogoutFAB() {
  return (
    <FAB
      style={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: colors.red,
      }}
      onPress={authService.logout}
      icon="logout"
    />
  );
}
