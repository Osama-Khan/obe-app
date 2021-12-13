import {ManyCriteria} from '@app/models/criteria';
import programService from '@app/services/program.service';
import uiService from '@app/services/ui.service';
import {CourseType, ProgramType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import {Caption, Card, Title} from 'react-native-paper';

export default function ProgramCoursesScreen() {
  const [courses, setCourses] = useState<CourseType[]>();
  const route = useRoute<any>();
  const navigation = useNavigation();
  const program = route.params!.program;

  useMemo(() => {
    navigation.setOptions({headerTitle: program.title + ' Courses'});
  }, []);

  useEffect(() => {
    const criteria = new ManyCriteria<ProgramType>();
    criteria.addRelation('courses');
    programService
      .getOne(program.id, criteria)
      .then(r => {
        setCourses(r.data.courses!);
      })
      .catch(e => uiService.toastError('Could not fetch courses!'));
  }, []);

  return (
    <FlatList
      data={courses}
      renderItem={({item}) => (
        <Card style={{margin: 16, marginVertical: 8, padding: 8}}>
          <Title>{item.title}</Title>
          <Caption>{item.code}</Caption>
        </Card>
      )}
    />
  );
}
