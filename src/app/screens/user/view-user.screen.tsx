import {FetchingDataTable} from '@app/components/data-table';
import {ManyCriteria} from '@app/models/criteria';
import userService from '@app/services/user.service';
import UserType from '@app/types/user.type';
import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {Button, Card, Text} from 'react-native-paper';
import {addUserRoute} from 'src/app.routes';

type P = {navigation: NavigationProp<any>};
const criteria = new ManyCriteria<UserType>({relations: ['role']});

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
      <Card style={{margin: 8}}>
        <FetchingDataTable
          fetchMethod={criteria => userService.get(criteria)}
          criteria={criteria}
          columns={[
            {
              property: 'username',
              title: 'Username',
            },
            {
              property: 'email',
              title: 'Email',
            },
            {
              property: ({item: user}) => <Text>{user.role!.name}</Text>,
              title: 'Role',
            },
          ]}
        />
      </Card>
    </>
  );
};
