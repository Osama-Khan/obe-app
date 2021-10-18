import programService from '@app/services/program.service';
import {ProgramType} from '@app/types';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Menu, Button} from 'react-native-paper';

type P = {
  selectedPrograms: Partial<ProgramType>[];
  onAdd: (program: ProgramType) => void;
};

const ProgramDropdown = ({selectedPrograms, onAdd}: P) => {
  const [shown, setShown] = useState(false);
  const [programs, setPrograms] = useState<ProgramType[]>();
  useEffect(() => {
    programService.get().then(res => {
      setPrograms(res.data);
    });
  }, []);
  return programs ? (
    <Menu
      anchor={
        <Button
          mode="outlined"
          color="gray"
          icon="chevron-down"
          style={{margin: 4}}
          onPress={() => setShown(true)}>
          Select Program
        </Button>
      }
      visible={shown}
      onDismiss={() => setShown(false)}
      children={programs.map(p => (
        <Menu.Item
          title={p.title}
          disabled={selectedPrograms?.find(_p => _p.id === p.id) !== undefined}
          onPress={() => {
            onAdd(p);
            setShown(false);
          }}
        />
      ))}
    />
  ) : (
    <ActivityIndicator />
  );
};

export default ProgramDropdown;
