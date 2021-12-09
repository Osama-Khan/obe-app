import React from 'react';
import {FAB, Title} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {AppStateType} from '@app/store/state';
import {colors} from '@app/styles';
import authService from '@app/services/auth.service';

export const Home = () => {
  const user = useSelector((state: AppStateType) => state.user.userData);
  return (
    <>
      <Title style={{margin: 16}}>Hello {user?.username}</Title>
      <FAB
        style={{
          position: 'absolute',
          right: 8,
          bottom: 8,
          backgroundColor: colors.red,
        }}
        icon="logout"
        onPress={authService.logout}
      />
    </>
  );
};
