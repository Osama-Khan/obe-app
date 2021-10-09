import userService from '@app/services/user.service';
import UserType from '@app/types/user.type';
import {Formik} from 'formik';
import React from 'react';
import {ToastAndroid, View} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';

type FormDataType = Omit<Partial<UserType>, 'dateOfBirth'> & {
  dateOfBirth: string;
  password: string;
};

export const AddUserScreen = () => (
  <View style={{height: '100%'}}>
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        dateOfBirth: '',
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
            label="Username"
            mode="outlined"
            value={values.username}
            onChangeText={handleChange('username')}
            style={{marginVertical: 4}}
          />
          <TextInput
            label="Email"
            mode="outlined"
            value={values.email}
            keyboardType="email-address"
            onChangeText={handleChange('email')}
            style={{marginVertical: 4}}
          />
          <TextInput
            label="Password"
            mode="outlined"
            value={values.password}
            secureTextEntry
            onChangeText={handleChange('password')}
            style={{marginVertical: 4}}
          />
          <TextInput
            label="Date of Birth"
            mode="outlined"
            value={values.dateOfBirth}
            placeholder="yyyy/mm/dd"
            onChangeText={handleChange('dateOfBirth')}
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

const isInvalid = (data: FormDataType) =>
  !data.username || !data.email || !data.password || !data.dateOfBirth;
const handleSubmit = (data: FormDataType) => {
  if (isInvalid(data)) {
    ToastAndroid.show('Invalid data', ToastAndroid.SHORT);
    return;
  }
  const submission: Partial<UserType> = {
    ...data,
    dateOfBirth: new Date(data.dateOfBirth),
  };
  userService.insert(submission).then(res => {
    ToastAndroid.show('Inserted with ID: ' + res.data.id, ToastAndroid.SHORT);
  });
};
