import {ManyCriteria} from '@app/models/criteria';
import {viewClosRoute} from '@app/routes/hod.routes';
import programService from '@app/services/program.service';
import uiService from '@app/services/ui.service';
import {colors} from '@app/styles';
import {CourseType, ProgramType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Button, Caption, Card, IconButton, Title} from 'react-native-paper';

export default function ProgramCoursesScreen() {
  const [courses, setCourses] = useState<CourseType[]>();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
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
        <Card
          style={{
            borderTopWidth: 2,
            borderColor: colors.primary,
            margin: 16,
            marginVertical: 8,
            overflow: 'hidden',
          }}>
          <View style={{padding: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Title>{item.title}</Title>
              <IconButton
                style={{marginLeft: 'auto'}}
                color={colors.red}
                icon="link-off"
                onPress={() => {}}
              />
            </View>
            <Caption>{item.code}</Caption>
          </View>
          <Button
            mode="outlined"
            icon="graph"
            style={{borderRadius: 0}}
            onPress={() => {
              navigation.navigate(viewClosRoute.name, {
                course: item,
                program,
              });
            }}>
            CLOs
          </Button>
        </Card>
      )}
    />
  );
}
