import courseService from '@app/services/course.service';
import CourseType from '@app/types/course.type';
import {Formik} from 'formik';
import React from 'react';
import {ToastAndroid, View} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';

export const AddCourseScreen = () => (
  <View style={{height: '100%'}}>
    <Formik
      initialValues={{
        title: '',
        code: '',
      }}
      onSubmit={handleSubmit}
      children={({handleChange, handleSubmit, values}) => (
        <Card
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            padding: 8,
            marginHorizontal: 8,
          }}>
          <TextInput
            label="Name"
            mode="outlined"
            value={values.title}
            onChangeText={handleChange('title')}
            style={{marginVertical: 4}}
          />
          <TextInput
            label="Code"
            mode="outlined"
            value={values.code}
            onChangeText={handleChange('code')}
            style={{marginVertical: 4}}
          />
          <Button
            mode="contained"
            icon="check"
            style={{marginVertical: 4, marginLeft: 'auto'}}
            onPress={handleSubmit}>
            Submit
          </Button>
        </Card>
      )}
    />
  </View>
);

const isInvalid = (data: Partial<CourseType>) => !data.code || !data.title;
const handleSubmit = (data: Partial<CourseType>) => {
  if (isInvalid(data)) {
    ToastAndroid.show('Invalid data', ToastAndroid.SHORT);
    return;
  }
  courseService
    .insert(data)
    .then(res => {
      ToastAndroid.show('Inserted with ID: ' + res.data.id, ToastAndroid.SHORT);
    })
    .catch(e => {
      ToastAndroid.show('Failed to insert!', ToastAndroid.SHORT);
    });
};
