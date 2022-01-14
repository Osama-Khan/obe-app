import {FetchingDataTable} from '@app/components/data-table';
import {ManyCriteria} from '@app/models/criteria';
import userService from '@app/services/user.service';
import UserType from '@app/types/user.type';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Card, FAB, Searchbar} from 'react-native-paper';
import {addUserRoute, userDetailRoute} from '@app/routes/admin.routes';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import RoleBadge from './components/RoleBadge';
import {View} from 'react-native';
import roleService from '@app/services/role.service';
import {Dropdown} from '@app/components/dropdown';

const criteria = new ManyCriteria<UserType>({relations: ['role']});

const useRoles = () => {
  const [roles, setRoles] = useState<{name: string; value: string}[]>();
  useEffect(() => {
    roleService.get().then(res => {
      setRoles(res.data.map(r => ({name: r.name, value: r.id})));
    });
  }, []);
  return roles;
};

export const ViewUserScreen = () => {
  const [updates, setUpdates] = useState(0);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const roles = useRoles();
  const navigation = useNavigation<any>();
  return (
    <>
      <ScrollView>
        <View style={{flexDirection: 'row', margin: 8}}>
          <Searchbar
            value={search}
            onChangeText={setSearch}
            style={{
              flexGrow: 1,
            }}
            placeholder="Search Users..."
          />
          {roles ? (
            <Dropdown
              onSelect={({value}) => setRole(value)}
              options={[{name: 'All Roles', value: ''}, ...roles]}
              style={{
                margin: 0,
                marginLeft: 8,
                paddingVertical: 16,
              }}
            />
          ) : (
            <ActivityIndicator />
          )}
        </View>
        <Card style={{margin: 8}}>
          <FetchingDataTable
            fetchMethod={criteria => userService.get(criteria)}
            criteria={criteria}
            key={updates}
            itemsPerPage={5}
            rowOnPress={item => {
              navigation.navigate(userDetailRoute.name, {
                user: item,
                onUpdate: () => setUpdates(updates + 1),
              });
            }}
            filter={user =>
              (user.username.toLowerCase().includes(search.toLowerCase()) ||
                user.id.toLowerCase().includes(search.toLowerCase())) &&
              (!role || user.role!.id === role)
            }
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
                  <View>
                    <RoleBadge roleName={user.role!.name} />
                  </View>
                ),
                title: 'Role',
                weight: 0.5,
              },
            ]}
          />
        </Card>
      </ScrollView>
      <FAB
        icon="plus"
        style={{position: 'absolute', bottom: 16, right: 16}}
        onPress={() =>
          navigation.navigate(addUserRoute.name, {
            onAdd: () => setUpdates(updates + 1),
          })
        }
      />
    </>
  );
};
