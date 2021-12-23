import programService from '@app/services/program.service';
import uiService from '@app/services/ui.service';
import {colors} from '@app/styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {
  Button,
  Caption,
  Card,
  Chip,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';

export const AddProgramScreen = () => {
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const nav = useNavigation();
  const r = useRoute<any>();
  const {onAdd} = r.params!;

  const error = dirty && !title;

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
          onChangeText={
            dirty
              ? setTitle
              : t => {
                  setDirty(true);
                  setTitle(t);
                }
          }
          error={error}
          style={{marginVertical: 4}}
        />
        {error && (
          <Caption style={{color: colors.red}}>Please enter a title!</Caption>
        )}
        <Button
          mode="contained"
          icon="check"
          disabled={!title}
          style={{marginVertical: 4}}
          onPress={() => {
            setSaving(true);
            programService
              .insert({title})
              .then(r => {
                uiService.toastSuccess('Successfully added program!');
                onAdd();
                nav.goBack();
              })
              .catch(() => {
                uiService.toastError('Could not add program!');
              })
              .finally(() => {
                setSaving(false);
              });
          }}>
          Add
        </Button>
      </Card>
    </ScrollView>
  );
};
