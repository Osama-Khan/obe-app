import {ManyCriteria} from '@app/models/criteria';
import allocationService from '@app/services/allocation.service';
import uiService from '@app/services/ui.service';
import {AllocationType, SectionType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/core';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import CoursesScreen from './courses.screen';
import StudentsScreen from './students.screen';
import TeachersScreen from './teachers.screen';

const {Navigator, Screen} = createMaterialTopTabNavigator();

export default function SectionDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const section: SectionType = route.params!.section;
  const allocations = useAllocations(section.id);

  const sectionName = `${section.program!.title}-${section.semester}${
    section.name
  }`;

  useMemo(() => {
    navigation.setOptions({
      headerTitle: sectionName,
    });
  }, []);

  return allocations ? (
    <Navigator>
      <Screen
        name="Students"
        component={StudentsScreen}
        initialParams={{section}}
      />

      <Screen
        name="Teachers"
        component={TeachersScreen}
        initialParams={{allocations}}
      />
      <Screen
        name="Courses"
        component={CoursesScreen}
        initialParams={{allocations}}
      />
    </Navigator>
  ) : (
    <ActivityIndicator style={{flexGrow: 1}} />
  );
}

const useAllocations = (sectionId: string) => {
  const [allocations, setAllocations] = useState<AllocationType[]>();
  const criteria = new ManyCriteria<AllocationType>();
  criteria.addRelation('section');
  criteria.addRelation('user');
  criteria.addRelation('course');
  criteria.addCondition('section', sectionId);
  useEffect(() => {
    allocationService
      .get(criteria)
      .then(r => {
        setAllocations(r.data);
      })
      .catch(() => {
        uiService.toastError('Failed to fetch allocation data!');
      });
  }, []);
  return allocations;
};
