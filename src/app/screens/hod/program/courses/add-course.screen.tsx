import courseService from '@app/services/course.service';
import uiService from '@app/services/ui.service';
import ProgramType from '@app/types/program.type';
import {useNavigation, useRoute} from '@react-navigation/native';
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

export default function AddCourseScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const {onAdd} = route.params;

  const [programs, setPrograms] = useState<Partial<ProgramType>[]>([]);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [creditHours, setCreditHours] = useState('');
  const [saving, setSaving] = useState(false);

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
          disabled={saving || isInvalid({title, code, creditHours})}
          loading={saving}
          onPress={async () => {
            setSaving(true);
            const r = await handleSubmit({
              title,
              code,
              creditHours,
              programs,
            });
            if (r) {
              onAdd({title, code, creditHours}, programs);
              navigation.goBack();
            }
            setSaving(false);
          }}>
          Submit
        </Button>
      </Card>
    </ScrollView>
  );
}

const isInvalid = (data: FormDataType) =>
  !data.code || !data.title || !data.creditHours || !isNumber(data.creditHours);

const isNumber = (str: string) => parseInt(str).toString() === str;
const handleSubmit = async (data: FormDataType) => {
  if (isInvalid(data)) {
    uiService.toastError('Invalid data!');
    return false;
  }
  const creditHours = parseInt(data.creditHours);
  const submission = {...data, creditHours};
  try {
    const res = await courseService.insert(submission);
    uiService.toastSuccess('Inserted with ID: ' + res.data.id);
    return true;
  } catch (e) {
    uiService.toastError('Failed to insert!');
    return false;
  }
};
