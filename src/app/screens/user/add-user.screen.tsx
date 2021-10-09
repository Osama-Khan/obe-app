import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';

export const AddUserScreen = () => (
  <View style={{height: '100%'}}>
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        dateOfBirth: '',
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
