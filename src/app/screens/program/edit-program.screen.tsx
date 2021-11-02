import programService from '@app/services/program.service';
import uiService from '@app/services/ui.service';
import {ProgramType} from '@app/types';
import {RouteProp} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Caption,
  Card,
  Divider,
  TextInput,
  Title,
} from 'react-native-paper';

type P = {
  route: RouteProp<any>;
};

export function EditProgramScreen({route}: P) {
  const [program, setProgram] = useState<ProgramType>();
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const id = route.params!.programId;
    console.log('Getting ' + id);
    programService
      .getOne(id)
      .then(res => {
        console.log(res);
        setProgram(res.data);
        setTitle(res.data['title']);
      })
      .catch(e => {
        uiService.toastError('Failed to load program data!');
      });
  }, []);
  return (
    <View>
      {program ? (
        <Card style={{margin: 8, padding: 8}}>
          <Title>Update Program</Title>
          <Caption>Make the changes and then tap save...</Caption>
          <Divider style={{marginVertical: 8}} />
          <TextInput
            style={{marginVertical: 4}}
            label="Program Title"
            value={title}
            onChangeText={setTitle}
          />
          <Button
            icon="floppy"
            mode="contained"
            onPress={() => {
              setSaving(true);
              programService
                .update(program.id, {title})
                .then(res => {
                  uiService.toastSuccess('Successfully updated data!');
                })
                .catch(e => {
                  uiService.toastSuccess('Failed to update data!');
                })
                .finally(() => setSaving(false));
            }}
            disabled={saving || !title}
            loading={saving}>
            Save
          </Button>
        </Card>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}
