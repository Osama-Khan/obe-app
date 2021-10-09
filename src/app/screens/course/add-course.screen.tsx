import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';

export const AddCourseScreen = () => (
  <View style={{height: '100%'}}>
    <Formik
      initialValues={{
        title: '',
        program: '',
      }}
      onSubmit={v => {
        console.log(v);
      }}
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
            label="Program"
            mode="outlined"
            value={values.program}
            onChangeText={handleChange('program')}
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
