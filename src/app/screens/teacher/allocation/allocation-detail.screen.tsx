import {useNavigation, useRoute} from '@react-navigation/core';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {Caption, IconButton, Title} from 'react-native-paper';
import {ViewClosScreen} from './clos';
import {ActivitiesScreen} from './activities';
import {AssessmentScreen} from './assessment';
import {StudentsScreen} from './students';
import {fcarRoute} from '@app/routes/teacher.routes';

const {Navigator, Screen} = createMaterialTopTabNavigator();

export default function AllocationDetail() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const allocation = route.params!.allocation;

  useMemo(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{flexDirection: 'row'}}>
          <Title style={{color: 'white'}}>
            {allocation.course!.titleShort}
          </Title>
          <Caption
            style={{
              alignSelf: 'flex-end',
              marginLeft: 8,
              color: 'white',
              opacity: 0.7,
            }}>
            ({allocation.section.id})
          </Caption>
        </View>
      ),
      headerRight: () => (
        <IconButton
          style={{marginVertical: 'auto'}}
          color="white"
          icon="chart-bar"
          onPress={() => {
            navigation.navigate(fcarRoute.name, {allocation});
          }}
        />
      ),
    });
  }, []);

  return (
    <Navigator>
      <Screen
        name="Exams"
        component={ActivitiesScreen}
        initialParams={{allocation}}
      />
      <Screen
        name="Assessment"
        options={() => ({tabBarLabelStyle: {fontSize: 10}})}
        component={AssessmentScreen}
        initialParams={{course: allocation.course!}}
      />
      <Screen
        name="CLOs"
        component={ViewClosScreen}
        initialParams={{
          course: allocation.course!,
          program: allocation.program!,
        }}
      />
      <Screen
        name="Students"
        component={StudentsScreen}
        initialParams={{allocation}}
      />
    </Navigator>
  );
}
