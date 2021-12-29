import React from 'react';
import {Caption, Card, FAB, Text, Title} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {AppStateType} from '@app/store/state';
import {colors} from '@app/styles';
import authService from '@app/services/auth.service';
import {ScrollView, View} from 'react-native';
import {FetchingDataTable} from '@app/components/data-table';
import userService from '@app/services/user.service';

export const Home = () => {
  const user = useSelector((state: AppStateType) => state.user.userData);
  return (
    <>
      <ScrollView>
        <View style={{margin: 16}}>
          <Title>Hello {user?.username}</Title>
          <Caption>Your result is as follows</Caption>
          <Card>
            <FetchingDataTable
              fetchMethod={c => userService.getResults(user!.id)}
              columns={[
                {
                  title: 'PLO',
                  selector: ({item}: any) => <Text>PLO {item.plo.number}</Text>,
                },
                {
                  title: 'Evaluated',
                  selector: ({item}: any) => (
                    <Text>{item.evaluated.toFixed(2)}%</Text>
                  ),
                },
                {
                  title: 'Achieved',
                  selector: ({item}: any) => (
                    <Text>{item.achieved.toFixed(2)}%</Text>
                  ),
                },
              ]}
            />
          </Card>
        </View>
      </ScrollView>
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
