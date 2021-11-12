import programService from '@app/services/program.service';
import uiService from '@app/services/ui.service';
import {PLOType} from '@app/types';
import ProgramType from '@app/types/program.type';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Card, Chip, Text, TextInput, Title} from 'react-native-paper';
import PloDropdown from './plo-dropdown';

export const AddProgramScreen = () => {
  const [plos, setPlos] = useState<PLOType[]>();
  const [title, setTitle] = useState('');
  return (
    <ScrollView>
      <View style={{marginTop: 8}} />
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
          value={title}
          onChangeText={setTitle}
          style={{marginVertical: 4}}
        />
        <Title>Add PLOs</Title>

        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {plos?.map(p => (
            <Chip
              style={{margin: 4}}
              onClose={() => {
                const arr = plos.filter(sp => sp.id !== p.id);
                setPlos(arr);
              }}>
              <Text>{p.title}</Text>
            </Chip>
          ))}
        </View>
        <PloDropdown
          onAdd={o => {
            const arr = plos ? [...plos, o] : [o];
            setPlos(arr);
          }}
          selectedPlos={plos || []}
        />
        <Button
          mode="contained"
          icon="check"
          disabled={isInvalid({title})}
          style={{marginVertical: 4, marginLeft: 'auto'}}
          onPress={() => handleSubmit({title, plos})}>
          Submit
        </Button>
      </Card>
    </ScrollView>
  );
};

const isInvalid = (data: Partial<ProgramType>) => !data.title;
const handleSubmit = (data: Partial<ProgramType>) => {
  if (isInvalid(data)) {
    uiService.toastError('Invalid data');
    return;
  }
  const submission = {
    title: data.title,
    plos: data.plos ? data.plos.map(p => ({id: p.id})) : [],
  };
  programService
    .insert(submission)
    .then(res => {
      uiService.toastSuccess('Inserted with ID: ' + res.data.id);
    })
    .catch(e => {
      uiService.toastError('Failed to insert!');
    });
};
