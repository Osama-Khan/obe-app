import DropdownFormik from '@app/components/dropdown/dropdown-formik';
import {DatePickerInputFormik} from '@app/components/pickers';
import roleService from '@app/services/role.service';
import uiService from '@app/services/ui.service';
import userService from '@app/services/user.service';
import UserType from '@app/types/user.type';
import {Formik} from 'formik';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Divider,
  Caption,
  TextInput,
} from 'react-native-paper';

type FormDataType = Partial<UserType> & {
  password: string;
};

let saving: boolean, setSaving: Dispatch<SetStateAction<boolean>>;
export const AddUserScreen = () => {
  const [roles, setRoles] = useState<any[]>();
  [saving, setSaving] = useState<boolean>(false);
  useEffect(() => {
    roleService
      .get()
      .then(res => {
        setRoles(res.data);
      })
      .catch(() => {
        uiService.toastError('Could not load roles!');
      });
  }, []);
  return (
    <ScrollView>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          dateOfBirth: undefined,
          role: undefined,
        }}
        onSubmit={handleSubmit}
        children={({handleChange, handleSubmit, values}) => (
          <Card
            style={{
              margin: 16,
            }}>
            <TextInput
              label="Username"
              mode="outlined"
              value={values.username}
              left={<TextInput.Icon name="account" />}
              onChangeText={handleChange('username')}
              style={{margin: 8}}
            />
            <TextInput
              label="Email"
              mode="outlined"
              left={<TextInput.Icon name="email" />}
              value={values.email}
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              style={{margin: 8}}
            />
            <TextInput
              label="Password"
              mode="outlined"
              left={<TextInput.Icon name="lock" />}
              value={values.password}
              secureTextEntry
              onChangeText={handleChange('password')}
              style={{margin: 8}}
            />
            <DatePickerInputFormik
              label="Date of birth"
              propKey="dateOfBirth"
              mode="outlined"
              left={<TextInput.Icon name="calendar" />}
              datePickerProps={{
                maxDate: new Date(),
              }}
              style={{margin: 8}}
            />
            <Divider style={{marginVertical: 8}} />
            <Caption style={{marginHorizontal: 8}}>User Role</Caption>
            {roles ? (
              <DropdownFormik
                options={roles.map(r => ({name: r.name, value: r.id}))}
                propKey="role"
                style={{margin: 8}}
              />
            ) : (
              <ActivityIndicator style={{margin: 8, alignSelf: 'center'}} />
            )}
            <Button
              mode="contained"
              icon="check"
              style={{margin: 8, marginLeft: 'auto'}}
              onPress={handleSubmit}
              disabled={isInvalid(values) || saving}
              loading={saving}>
              Submit
            </Button>
          </Card>
        )}
      />
    </ScrollView>
  );
};

const isInvalid = (data: FormDataType) =>
  !data.username ||
  !data.email ||
  !data.password ||
  !data.dateOfBirth ||
  !data.role;
const handleSubmit = (data: FormDataType) => {
  setSaving(true);
  if (isInvalid(data)) {
    uiService.toastError('Invalid data');
    return;
  }
  const submission = {...data, role: data.role!.id};
  userService
    .insert(data)
    .then(res => {
      uiService.toastSuccess('Inserted with ID: ' + res.data.id);
    })
    .catch(() => {
      uiService.toastError('Could not insert user!');
    })
    .finally(() => {
      setSaving(false);
    });
};
