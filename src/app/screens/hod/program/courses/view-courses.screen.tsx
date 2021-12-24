import {ManyCriteria} from '@app/models/criteria';
import {
  addCourseRoute,
  editCourseRoute,
  viewClosRoute,
} from '@app/routes/hod.routes';
import programService from '@app/services/program.service';
import uiService from '@app/services/ui.service';
import {colors} from '@app/styles';
import {CourseType, ProgramType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Caption,
  Card,
  Divider,
  FAB,
  IconButton,
  Title,
} from 'react-native-paper';

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

  return courses ? (
    <>
      <FlatList
        data={courses}
        renderItem={({item, index}) => (
          <Card
            key={item.id}
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
                  style={{
                    marginLeft: 'auto',
                    backgroundColor: colors.primarySubtle,
                  }}
                  color={colors.primary}
                  icon="pencil"
                  onPress={() => {
                    navigation.navigate(editCourseRoute.name, {
                      courseId: item.id,
                      onEdit: (course: Partial<CourseType>) => {
                        courses[index] = {...item, ...course};
                        setCourses([...courses]);
                      },
                    });
                  }}
                />
              </View>
              <Caption>{item.code}</Caption>
            </View>
            <Divider />
            <Button
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
      <FAB
        icon="plus"
        style={{position: 'absolute', bottom: 16, right: 16}}
        onPress={() =>
          navigation.navigate(addCourseRoute.name, {
            onAdd: (course: CourseType, programs: Partial<ProgramType>[]) => {
              if (programs.find(p => p.id === program.id)) {
                courses.push(course);
                setCourses([...courses]);
              }
            },
          })
        }
      />
    </>
  ) : (
    <ActivityIndicator style={{flexGrow: 1}} />
  );
}
