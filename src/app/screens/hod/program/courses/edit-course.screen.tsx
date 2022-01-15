import courseService from '@app/services/course.service';
import uiService from '@app/services/ui.service';
import {CourseType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/core';
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

type FormData = Pick<CourseType, 'title' | 'id' | 'theoryHours' | 'labHours'>;
const initialData = {
  title: '',
  id: '',
  theoryHours: '',
  labHours: '',
};

export default function EditCourseScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const {courseId, onEdit} = route.params;

  const [course, setCourse] = useState<CourseType>();
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const id = courseId;
    courseService
      .getOne(id)
      .then(res => {
        setCourse(res.data);
        const {titleShort: title, id, theoryHours, labHours} = res.data;
        setData({
          title,
          id,
          theoryHours: (theoryHours as number).toString(),
          labHours: (labHours as number).toString(),
        });
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
            mode="outlined"
          />
          <TextInput
            style={{marginVertical: 4}}
            label="Course Code"
            value={data.id}
            onChangeText={id => setData({...data, id})}
            mode="outlined"
          />
          <TextInput
            style={{marginVertical: 4}}
            label="Theory Hours"
            value={data.theoryHours.toString()}
            onChangeText={theoryHours => setData({...data, theoryHours})}
            mode="outlined"
          />
          <TextInput
            style={{marginVertical: 4}}
            label="Lab Hours"
            value={data.labHours.toString()}
            onChangeText={labHours => setData({...data, labHours})}
            mode="outlined"
          />
          <Button
            icon="floppy"
            mode="contained"
            style={{marginTop: 8}}
            onPress={async () => {
              setSaving(true);
              let d: Partial<FormData> = {};
              data.id && (d.id = data.id);
              data.theoryHours && (d.theoryHours = parseInt(data.theoryHours));
              data.labHours && (d.labHours = parseInt(data.labHours));
              data.title && (d.title = data.title);
              try {
                await courseService.update(course.id, d);
                onEdit(data);
                uiService.toastSuccess('Successfully updated data!');
                navigation.goBack();
              } catch (e) {
                uiService.toastError('Failed to update data!');
              } finally {
                setSaving(false);
              }
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
  data.title === course.titleShort &&
  data.id === course.id &&
  data.theoryHours === course.theoryHours.toString() &&
  data.labHours === course.labHours.toString();
