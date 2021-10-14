import {FetchingCardList} from '@app/components/listing';
import userService from '@app/services/user.service';
import UserType from '@app/types/user.type';
import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {Button} from 'react-native-paper';
import {addUserRoute} from 'src/app.routes';

type P = {navigation: NavigationProp<any>};
export const ViewUserScreen = ({navigation}: P) => {
  return (
    <>
      <Button
        icon="plus"
        style={{margin: 8, marginLeft: 'auto'}}
        mode="contained"
        onPress={() => navigation.navigate(addUserRoute.name)}>
        Add
      </Button>
      <FetchingCardList<UserType>
        fetchMethod={() => userService.get()}
        title={item => item.username}
        description={item => item.email}
      />
    </>
  );
};
