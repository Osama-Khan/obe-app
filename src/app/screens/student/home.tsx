import React from 'react';
import {Caption, Card, FAB, Title} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {AppStateType} from '@app/store/state';
import {colors} from '@app/styles';
import authService from '@app/services/auth.service';
import {ScrollView, View} from 'react-native';
import StudentResultTable from '@app/components/StudentResultTable';
import {useNavigation} from '@react-navigation/native';
import {evaluationDetailRoute} from '@app/routes/student.routes';

export const Home = () => {
  const user = useSelector((state: AppStateType) => state.user.userData);
  const navigation = useNavigation<any>();
  return (
    <>
      <ScrollView>
        <View style={{margin: 16}}>
          <Title>Hello {user?.username}</Title>
          <Caption>Your result is as follows</Caption>
          <Card>
            <StudentResultTable
              id={user?.id}
              rowOnPress={({plo}) => {
                navigation.navigate(evaluationDetailRoute.name, {
                  plo,
                });
              }}
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
