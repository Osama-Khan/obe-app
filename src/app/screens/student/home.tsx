import React from 'react';
import {Caption, Card, IconButton, Title} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {AppStateType} from '@app/store/state';
import {colors} from '@app/styles';
import {ScrollView, View} from 'react-native';
import StudentResultTable from '@app/components/StudentResultTable';
import {useNavigation} from '@react-navigation/native';
import {transcriptRoute} from '@app/routes/shared.routes';
import {LogoutFAB} from '@app/components/FAB';

export const Home = () => {
  const user = useSelector((state: AppStateType) => state.user.userData);
  const nav = useNavigation<any>();
  return (
    <>
      <ScrollView>
        <View style={{padding: 16, backgroundColor: colors.primary}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Title style={{color: '#fff', fontWeight: 'bold'}}>
              Hello {user?.username}
            </Title>
            <IconButton
              icon="file-table"
              color="white"
              style={{margin: 0}}
              onPress={() => nav.navigate(transcriptRoute.name, {id: user!.id})}
            />
          </View>
          <Caption style={{color: '#ddd'}}>Your result is as follows</Caption>
          <View style={{height: 64}} />
        </View>
        <Card style={{margin: 8, position: 'relative', bottom: 80}}>
          <StudentResultTable id={user?.id} />
        </Card>
      </ScrollView>
      <LogoutFAB />
    </>
  );
};
