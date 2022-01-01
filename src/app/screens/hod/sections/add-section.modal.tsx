import React, {useEffect, useState} from 'react';
import {ModalProps, View} from 'react-native';
import Modal from '@app/components/modal';
import {
  ActivityIndicator,
  Button,
  Caption,
  TextInput,
  Title,
} from 'react-native-paper';
import {ProgramType, SectionType} from '@app/types';
import programService from '@app/services/program.service';
import ListSelect from '@app/components/list-select';

type P = ModalProps & {onAdd: (data: Partial<SectionType>) => void};

export default function AddSectionModal({onAdd, ...modalProps}: P) {
  const [programs, setPrograms] = useState<ProgramType[]>();
  const [name, setName] = useState('');
  const [semester, setSemester] = useState('');
  const [program, setProgram] = useState<ProgramType>();

  useEffect(() => {
    programService.get().then(r => {
      setPrograms(r.data);
      setProgram(r.data[0]);
    });
  }, []);

  return (
    <Modal {...modalProps}>
      {programs ? (
        <View style={{padding: 8}}>
          <Title>Add Section</Title>
          <TextInput
            label="Name"
            mode="outlined"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            label="Semester"
            mode="outlined"
            value={semester}
            maxLength={2}
            onChangeText={text => {
              if (text !== '') {
                if (!new RegExp('^[0-9]*$').test(text)) {
                  return;
                }
              }
              setSemester(text);
            }}
          />
          <Caption>Select Program</Caption>
          <ListSelect
            options={programs.map(p => ({name: p.title, value: p.id}))}
            onSelect={selected => {
              setProgram(programs.find(p => p.id === selected.value)!);
            }}
          />
          <Button
            style={{marginLeft: 'auto', marginTop: 8}}
            icon="plus"
            onPress={() => {
              setSemester('');
              setName('');
              onAdd({name, semester: parseInt(semester), program});
            }}
            disabled={!name || !semester}>
            Add
          </Button>
        </View>
      ) : (
        <ActivityIndicator style={{margin: 16, alignSelf: 'center'}} />
      )}
    </Modal>
  );
}
