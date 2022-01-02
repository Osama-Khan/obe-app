import {DataTable} from '@app/components/data-table';
import {studentResultsRoute} from '@app/routes/shared.routes';
import {AllocationType, CourseType, UserType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Card} from 'react-native-paper';

export default function CoursesScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
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
          {title: 'Code', selector: 'code'},
          {title: 'Name', selector: 'title'},
          {title: 'Credit Hours', selector: 'creditHours'},
        ]}
      />
    </Card>
  ) : (
    <ActivityIndicator style={{display: 'flex'}} />
  );
}
