import Icon from '@app/components/icon';
import {ConfirmModal} from '@app/components/modal';
import {
  abstractMappingRoute,
  addCourseRoute,
  assessmentRoute,
  editCourseRoute,
  viewClosRoute,
} from '@app/routes/hod.routes';
import courseService from '@app/services/course.service';
import uiService from '@app/services/ui.service';
import {colors} from '@app/styles';
import {CourseType, CourseWithActionType, ProgramType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import {
  ActivityIndicator,
  Caption,
  Card,
  Divider,
  FAB,
  IconButton,
  Menu,
  Searchbar,
  Title,
} from 'react-native-paper';
import {CourseCard, CourseCardButton, CourseCardMenu} from './components';

export default function ProgramCoursesScreen() {
  const [deleting, setDeleting] = useState<CourseType>();
  const [menu, setMenu] = useState('');
  const [courses, setCourses] = useState<CourseWithActionType[]>();
  const [search, setSearch] = useState('');
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const program = route.params!.program;

  useMemo(() => {
    navigation.setOptions({headerTitle: program.title + ' Courses'});
  }, []);

  useEffect(() => {
    courseService
      .getWithActions(program.id)
      .then(r => {
        setCourses(r.data!);
      })
      .catch(e => uiService.toastError('Could not fetch courses!'));
  }, []);

  return courses ? (
    <>
      <Searchbar
        value={search}
        onChangeText={setSearch}
        style={{margin: 8}}
        editable={courses.length > 0}
        placeholder="Search Courses..."
      />
      <FlatList
        data={courses.filter(
          c =>
            c.title.includes(search) ||
            c.titleShort.includes(search) ||
            c.id.includes(search),
        )}
        renderItem={({item, index}) => (
          <CourseCard
            course={item}
            program={program}
            onEdit={() => {
              navigation.navigate(editCourseRoute.name, {
                courseId: item.id,
                onEdit: (course: Partial<CourseType>) => {
                  courses[index] = {...item, ...course};
                  setCourses([...courses]);
                },
              });
            }}
            onDelete={() => setDeleting(item)}
          />
        )}
      />
      <FAB
        icon="plus"
        style={{position: 'absolute', bottom: 16, right: 16}}
        onPress={() =>
          navigation.navigate(addCourseRoute.name, {
            onAdd: (course: CourseType, programs: Partial<ProgramType>[]) => {
              if (programs.find(p => p.id === program.id)) {
                courses.push({...course, needsPlos: true});
                setCourses([...courses]);
              }
            },
          })
        }
      />
      {deleting && (
        <ConfirmModal
          title={'Delete Course?'}
          description={`Are you sure you want to delete the course "${deleting.titleShort}"?`}
          visible={!!deleting}
          positiveButton={{
            onPress: () => {
              courseService
                .delete(deleting!.id)
                .then(res => {
                  uiService.toastSuccess('Course deleted!');
                  setCourses(courses.filter(c => c.id !== res.data.id));
                })
                .catch(() => {
                  uiService.toastError('Could not delete course!');
                });
              setDeleting(undefined);
            },
          }}
          negativeButton={{
            onPress: () => {
              setDeleting(undefined);
            },
          }}
          onDismiss={() => {
            setDeleting(undefined);
          }}
        />
      )}
    </>
  ) : (
    <ActivityIndicator style={{flexGrow: 1}} />
  );
}
