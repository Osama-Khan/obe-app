import {useNavigation, useRoute} from '@react-navigation/core';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {Caption, Title} from 'react-native-paper';
import {ActivitiesScreen} from './activities';
import {AssessmentScreen} from './assessment';
import StudentsScreen from './students';

const {Navigator, Screen} = createMaterialTopTabNavigator();

export default function AllocationDetail() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const allocation = route.params!.allocation;

  const sectionName = `${allocation.program!.title}-${
    allocation.section!.semester
  }${allocation.section!.name}`;

  useMemo(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{flexDirection: 'row'}}>
          <Title style={{color: 'white'}}>{allocation.course!.title}</Title>
          <Caption
            style={{
              alignSelf: 'flex-end',
              marginLeft: 8,
              color: 'white',
              opacity: 0.7,
            }}>
            ({sectionName})
          </Caption>
        </View>
      ),
    });
  }, []);

  return (
    <Navigator>
      <Screen
        name="Activities"
        component={ActivitiesScreen}
        initialParams={{allocation}}
      />
      <Screen
        name="Assessment"
        component={AssessmentScreen}
        initialParams={{allocation}}
      />
      <Screen
        name="Students"
        component={StudentsScreen}
        initialParams={{allocation}}
      />
    </Navigator>
  );
}
