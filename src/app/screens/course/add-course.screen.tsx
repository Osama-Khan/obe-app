import {Dropdown} from '@app/components/dropdown';
import courseService from '@app/services/course.service';
import programService from '@app/services/program.service';
import CourseType from '@app/types/course.type';
import ProgramType from '@app/types/program.type';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';

export const AddCourseScreen = () => {
  const [programs, setPrograms] = useState<ProgramType[]>();
  const [selectedPrograms, setSelectedPrograms] = useState<
    Pick<ProgramType, 'id' | 'title'>[]
  >([]);

  useEffect(() => {
    programService.get().then(res => {
      setPrograms(res.data);
    });
  }, []);

  return (
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
            <Title>Enter Details</Title>
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
            <Title>Add Programs</Title>
            <View style={{flexDirection: 'row'}}>
              {selectedPrograms?.map(p => (
                <Chip
                  onClose={() => {
                    const arr = selectedPrograms.filter(sp => sp.id !== p.id);
                    setSelectedPrograms(arr);
                  }}>
                  <Text>{p.title}</Text>
                </Chip>
              ))}
            </View>
            {programs ? (
              <Dropdown
                onSelect={o => {
                  const arr = [
                    ...selectedPrograms,
                    {id: o.value, title: o.name},
                  ];
                  setSelectedPrograms(arr);
                }}
                options={programs.map(p => {
                  return {
                    name: p.title,
                    value: p.id,
                    disabled:
                      selectedPrograms?.find(_p => _p.id === p.id) !==
                      undefined,
                  };
                })}
              />
            ) : (
              <ActivityIndicator />
            )}

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
};

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
