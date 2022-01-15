import {DataTable} from '@app/components/data-table';
import {AllocationType, CourseType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Card, Text} from 'react-native-paper';

export default function CoursesScreen() {
  const route = useRoute<any>();
  const [courses, setCourses] = useState<CourseType[]>([]);
  const allocations: AllocationType[] = route.params!.allocations;

  useEffect(() => {
    if (!allocations) return;
    const courses: CourseType[] = [];
    for (const a of allocations) {
      if (!courses.find(c => c.id === a.course!.id)) {
        courses.push(a.course!);
      }
    }

    setCourses(courses);
  }, [allocations]);

  return courses ? (
    <Card style={{margin: 8}}>
      <DataTable
        data={courses}
        columns={[
          {title: 'Code', selector: 'id'},
          {title: 'Name', selector: 'title'},
          {
            title: 'Credit Hours',
            selector: ({item: {theoryHours: t, labHours: l}}) => (
              <Text>
                {Math.floor(t + l / 2)} ({t}-{l})
              </Text>
            ),
          },
        ]}
      />
    </Card>
  ) : (
    <ActivityIndicator style={{display: 'flex'}} />
  );
}
