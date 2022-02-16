import React, {useMemo} from 'react';
import {Caption, Card, IconButton, Title} from 'react-native-paper';
import {ScrollView, View} from 'react-native';
import StudentResultTable from '@app/components/StudentResultTable';
import {UserType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {transcriptRoute} from '@app/routes/shared.routes';

export const StudentResultsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const user: UserType = route.params!.user;
  useMemo(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="file-table"
          onPress={() => navigation.navigate(transcriptRoute.name, {user})}
          color="white"
        />
      ),
    });
  }, []);
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
