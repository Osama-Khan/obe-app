import {colors} from '@app/styles';
import {UserType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import RoleBadge from './components/RoleBadge';

export default function UserDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const user: UserType = route.params!.user;

  useMemo(() => {
    navigation.setOptions({headerTitle: user.username});
  }, []);

  return (
    <Card style={{margin: 8, padding: 8}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <RoleBadge roleName={user.role!.name} />
      </View>
      <TextPair title="ID" description={user.id} />
      <TextPair title="Username" description={'@' + user.username} />
      <TextPair title="Email" description={user.email} />
      <TextPair
        title="Date of Birth"
        description={new Date(user.dateOfBirth).toLocaleDateString()}
      />
    </Card>
  );
}

const TextPair = ({title, description}: any) => (
  <View
    style={{flexDirection: 'row', justifyContent: 'space-between', padding: 8}}>
    <Text style={{fontWeight: 'bold'}}>{title}: </Text>
    <Text>{description}</Text>
  </View>
);
