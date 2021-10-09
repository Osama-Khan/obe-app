import programService from '@app/services/program.service';
import ProgramType from '@app/types/program.type';
import {Formik} from 'formik';
import React from 'react';
import {ToastAndroid, View} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';

export const AddProgramScreen = () => (
  <View style={{height: '100%'}}>
    <Formik
      initialValues={{
        title: '',
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
            label="Title"
            mode="outlined"
            value={values.title}
            onChangeText={handleChange('title')}
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

const isInvalid = (data: Partial<ProgramType>) => !data.title;
const handleSubmit = (data: Partial<ProgramType>) => {
  if (isInvalid(data)) {
    ToastAndroid.show('Invalid data', ToastAndroid.SHORT);
    return;
  }
  programService
    .insert(data)
    .then(res => {
      ToastAndroid.show('Inserted with ID: ' + res.data.id, ToastAndroid.SHORT);
    })
    .catch(e => {
      ToastAndroid.show('Failed to insert!', ToastAndroid.SHORT);
    });
};
