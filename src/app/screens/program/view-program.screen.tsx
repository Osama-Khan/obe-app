import {FetchingCardList} from '@app/components/listing';
import programService from '@app/services/program.service';
import ProgramType from '@app/types/program.type';
import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {Button} from 'react-native-paper';
import {addProgramRoute} from 'src/app.routes';

type P = {navigation: NavigationProp<any>};
export const ViewProgramScreen = ({navigation}: P) => {
  return (
    <>
      <Button
        icon="plus"
        style={{margin: 8, marginLeft: 'auto'}}
        mode="contained"
        onPress={() => navigation.navigate(addProgramRoute.name)}>
        Add
      </Button>
      <FetchingCardList<ProgramType>
        fetchMethod={() => programService.get()}
        title={item => item.title}
        description={item => item.id}
      />
    </>
  );
};
