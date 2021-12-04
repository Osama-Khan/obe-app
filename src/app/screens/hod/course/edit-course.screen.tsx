import courseService from '@app/services/course.service';
import uiService from '@app/services/ui.service';
import {CourseType} from '@app/types';
import {NavigationProp, RouteProp} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {
  Button,
  Caption,
  Card,
  Divider,
  TextInput,
  Title,
} from 'react-native-paper';

type P = {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
};

type FormData = Pick<CourseType, 'title' | 'code' | 'creditHours'>;
const initialData = {
  title: '',
  code: '',
  creditHours: '',
};

export default function EditCourseScreen({navigation, route}: P) {
  const [course, setCourse] = useState<CourseType>();
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const id = route.params!.courseId;
    courseService
      .getOne(id)
      .then(res => {
        setCourse(res.data);
        const {title, code, creditHours: hrs} = res.data;
        setData({title, code, creditHours: (hrs as number).toString()});
      })
      .catch(e => {
        uiService.toastError('Failed to load course data!');
      });
  }, []);
  return (
    <View>
      {course ? (
        <Card style={{margin: 8, padding: 8}}>
          <Title>Update Course</Title>
          <Caption>Make the changes and then tap save...</Caption>
          <Divider style={{marginVertical: 8}} />
          <TextInput
            style={{marginVertical: 4}}
            label="Course Title"
            value={data.title}
            onChangeText={title => setData({...data, title})}
          />
          <TextInput
            style={{marginVertical: 4}}
            label="Course Code"
            value={data.code}
            onChangeText={code => setData({...data, code})}
          />
          <TextInput
            style={{marginVertical: 4}}
            label="Credit Hours"
            value={data.creditHours.toString()}
            onChangeText={creditHours => setData({...data, creditHours})}
          />
          <Button
            icon="floppy"
            mode="contained"
            onPress={() => {
              setSaving(true);
              let d: Partial<FormData> = {};
              data.code && (d.code = data.code);
              data.creditHours && (d.creditHours = parseInt(data.creditHours));
              data.title && (d.title = data.title);
              courseService
                .update(course.id, d)
                .then(res => {
                  uiService.toastSuccess('Successfully updated data!');
                })
                .catch(e => {
                  uiService.toastError('Failed to update data!');
                })
                .finally(() => setSaving(false));
            }}
            disabled={saving || hasNoChange(data, course)}
            loading={saving}>
            Save
          </Button>
        </Card>
      ) : (
        <></>
      )}
    </View>
  );
}

const hasNoChange = (data: typeof initialData, course: CourseType) =>
  data.title === course.title &&
  data.code === course.code &&
  data.creditHours === course.creditHours.toString();
