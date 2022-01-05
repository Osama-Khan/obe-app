import programService from '@app/services/program.service';
import uiService from '@app/services/ui.service';
import {ProgramType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/core';
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

export function EditProgramScreen() {
  const [program, setProgram] = useState<ProgramType>();
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const navigation = useNavigation();
  const route = useRoute<any>();
  const onEdit = route.params!.onEdit;

  useEffect(() => {
    const id = route.params!.programId;
    programService
      .getOne(id)
      .then(res => {
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
            mode="outlined"
          />
          <Button
            icon="floppy"
            mode="contained"
            style={{marginTop: 8}}
            onPress={() => {
              setSaving(true);
              programService
                .update(program.id, {title})
                .then(() => {
                  uiService.toastSuccess('Successfully updated data!');
                  onEdit();
                  navigation.goBack();
                })
                .catch(() => {
                  uiService.toastError('Failed to update data!');
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
