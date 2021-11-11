import courseService from '@app/services/course.service';
import uiService from '@app/services/ui.service';
import ProgramType from '@app/types/program.type';
import React, {useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Button,
  Card,
  Chip,
  Divider,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';
import ProgramDropdown from './program-dropdown';

type FormDataType = {
  title: string;
  code: string;
  creditHours: string;
  programs?: ProgramType[];
};

export const AddCourseScreen = () => {
  const [programs, setPrograms] = useState<Partial<ProgramType>[]>([]);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [creditHours, setCreditHours] = useState('');

  return (
    <ScrollView>
      <View style={{marginTop: 4}} />
      <Card
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          padding: 8,
          marginHorizontal: 8,
        }}>
        <Title>Enter Details</Title>
        <TextInput
          label="Title"
          mode="outlined"
          value={title}
          onChangeText={setTitle}
          style={{marginVertical: 4}}
        />
        <TextInput
          label="Code"
          mode="outlined"
          value={code}
          onChangeText={setCode}
          style={{marginVertical: 4}}
        />
        <TextInput
          label="Credit Hours"
          keyboardType="numeric"
          mode="outlined"
          value={creditHours}
          onChangeText={setCreditHours}
          style={{marginVertical: 4}}
        />

        <Title>Add to Programs</Title>

        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {programs?.map(p => (
            <Chip
              style={{margin: 4}}
              onClose={() => {
                const arr = programs.filter(sp => sp.id !== p.id);
                setPrograms(arr);
              }}>
              <Text>{p.title}</Text>
            </Chip>
          ))}
        </View>
        <ProgramDropdown
          onAdd={o => {
            const arr = [...programs, {id: o.id, title: o.title}];
            setPrograms(arr);
          }}
          selectedPrograms={programs}
        />

        <Divider style={{marginVertical: 12}} />
        <Button
          mode="contained"
          icon="check"
          style={{marginVertical: 4, marginLeft: 'auto'}}
          disabled={isInvalid({title, code, creditHours})}
          onPress={() =>
            handleSubmit({
              title,
              code,
              creditHours,
              programs,
            })
          }>
          Submit
        </Button>
      </Card>
    </ScrollView>
  );
};

const isInvalid = (data: FormDataType) =>
  !data.code || !data.title || !data.creditHours || !isNumber(data.creditHours);

const isNumber = (str: string) => parseInt(str).toString() === str;
const handleSubmit = (data: FormDataType) => {
  if (isInvalid(data)) {
    uiService.toastError('Invalid data!');
    return;
  }
  const creditHours = parseInt(data.creditHours);
  const submission = {...data, creditHours};
  courseService
    .insert(submission)
    .then(res => {
      uiService.toastSuccess('Inserted with ID: ' + res.data.id);
    })
    .catch(e => {
      uiService.toastError('Failed to insert!');
    });
};
