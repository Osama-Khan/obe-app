import React from 'react';
import {Title} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {AppStateType} from '@app/store/state';

export const Home = () => {
  const user = useSelector((state: AppStateType) => state.user.userData);
  return (
    <>
      <Title style={{margin: 16}}>Hello {user!.username}</Title>
    </>
  );
};
