import programService from '@app/services/program.service';
import ProgramType from '@app/types/program.type';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Caption, Card, Text, Title} from 'react-native-paper';

export const ViewProgramScreen = () => {
  const [data, setData] = useState<ProgramType[]>();
  useEffect(() => {
    programService
      .get()
      .then(res => {
        setData(res.data);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);
  return (
    <FlatList
      data={data}
      renderItem={info => (
        <Card style={{margin: 4, padding: 4}} key={info.index}>
          <Text>{info.item.title}</Text>
          <Caption>{info.item.id}</Caption>
        </Card>
      )}
    />
  );
};
