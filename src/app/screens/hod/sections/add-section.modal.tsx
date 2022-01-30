import React, {useEffect, useState} from 'react';
import {ModalProps, ScrollView, View} from 'react-native';
import Modal from '@app/components/modal';
import {
  ActivityIndicator,
  Button,
  Caption,
  Chip,
  Divider,
  Text,
  Title,
  useTheme,
} from 'react-native-paper';
import {ProgramType, SectionType} from '@app/types';
import programService from '@app/services/program.service';
import ListSelect from '@app/components/list-select';

type P = ModalProps & {
  onAdd: (data: Partial<SectionType>) => void;
  sections: SectionType[];
};

export default function AddSectionModal({onAdd, sections, ...modalProps}: P) {
  const [programs, setPrograms] = useState<ProgramType[]>();
  const [name, setName] = useState('');
  const [semester, setSemester] = useState(-1);
  const [program, setProgram] = useState<ProgramType>();
  const theme = useTheme();

  useEffect(() => {
    programService.get().then(r => {
      setPrograms(r.data);
      setProgram(r.data[0]);
    });
  }, []);

  useEffect(() => {
    if (!program || semester === -1) {
      setName('');
      return;
    }
    const names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const num = sections.filter(
      s => s.program!.id === program.id && s.semester === semester,
    ).length;
    if (num > names.length) setName(num.toString());
    else setName(names[num]);
  }, [program, semester]);

  return (
    <Modal {...modalProps}>
      {programs ? (
        <View style={{padding: 8}}>
          <Title>Add Section</Title>
          <Caption>Semester</Caption>
          <ScrollView horizontal style={{alignSelf: 'center'}}>
            {[...Array(12).keys()].map(k => (
              <Chip
                style={{
                  margin: 2,
                }}
                selected={semester === k + 1}
                selectedColor={theme.colors.text}
                onPress={() => setSemester(k + 1)}>
                {k + 1}
              </Chip>
            ))}
          </ScrollView>
          <Caption>Program</Caption>
          <ListSelect
            options={programs.map(p => ({name: p.title, value: p.id}))}
            onSelect={selected => {
              setProgram(programs.find(p => p.id === selected.value)!);
            }}
          />
          {program && semester !== -1 && (
            <View style={{alignItems: 'center'}}>
              <Caption>Full Section Name</Caption>
              <Text>
                {program.title}-{semester}
                {name}
              </Text>
            </View>
          )}
          <Divider style={{marginTop: 8}} />
          <Button
            style={{marginLeft: 'auto', marginTop: 8}}
            icon="plus"
            onPress={() => {
              setSemester(-1);
              setName('');
              onAdd({name, semester: semester, program});
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
