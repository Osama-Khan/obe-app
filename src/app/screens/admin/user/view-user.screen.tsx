import {FetchingDataTable} from '@app/components/data-table';
import {ManyCriteria} from '@app/models/criteria';
import userService from '@app/services/user.service';
import UserType from '@app/types/user.type';
import React, {useState} from 'react';
import {addUserRoute} from '@app/routes/admin.routes';
import {Button, Card} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import RoleBadge from './components/RoleBadge';

const criteria = new ManyCriteria<UserType>({relations: ['role']});

export const ViewUserScreen = () => {
  const [updates, setUpdates] = useState(0);
  const navigation = useNavigation<any>();
  return (
    <ScrollView>
      <Button
        icon="plus"
        style={{margin: 8, marginLeft: 'auto'}}
        mode="contained"
        onPress={() =>
          navigation.navigate(addUserRoute.name, {
            onAdd: () => setUpdates(updates + 1),
          })
        }>
        Add
      </Button>
      <Card style={{margin: 8}}>
        <FetchingDataTable
          fetchMethod={criteria => userService.get(criteria)}
          criteria={criteria}
          key={updates}
          itemsPerPage={5}
          columns={[
            {
              selector: 'username',
              title: 'Username',
              weight: 0.5,
            },
            {
              selector: 'email',
              title: 'Email',
            },
            {
              selector: ({item: user}) => (
                <RoleBadge roleName={user.role!.name} />
              ),
              title: 'Role',
              weight: 0.5,
            },
          ]}
        />
      </Card>
    </ScrollView>
  );
};
