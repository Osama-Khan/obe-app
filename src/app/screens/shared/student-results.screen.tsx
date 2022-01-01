import React from 'react';
import {Caption, Card, Title} from 'react-native-paper';
import {ScrollView, View} from 'react-native';
import StudentResultTable from '@app/components/StudentResultTable';
import {UserType} from '@app/types';
import {useRoute} from '@react-navigation/native';

export const StudentResultsScreen = () => {
  const route = useRoute<any>();
  const user: UserType = route.params!.user;
  return (
    <ScrollView>
      <View style={{margin: 16}}>
        <Title>Result for {user.username}</Title>
        <Caption>{user.id}</Caption>
        <Card>
          <StudentResultTable id={user.id} />
        </Card>
      </View>
    </ScrollView>
  );
};
