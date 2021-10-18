import {FetchingCardList} from '@app/components/listing';
import {ConfirmModal} from '@app/components/modal';
import programService from '@app/services/program.service';
import ProgramType from '@app/types/program.type';
import {NavigationProp} from '@react-navigation/core';
import React, {useState} from 'react';
import {ToastAndroid} from 'react-native';
import {Button} from 'react-native-paper';
import {addProgramRoute} from 'src/app.routes';

type P = {navigation: NavigationProp<any>};
export const ViewProgramScreen = ({navigation}: P) => {
  const [selected, setSelected] = useState<ProgramType>();
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
        handleDelete={item => {
          setSelected(item);
        }}
      />
      <ConfirmModal
        title="Delete Program?"
        description={`Are you sure you want to delete the program "${selected?.title}"?`}
        visible={!!selected}
        positiveButton={{
          onPress: () => {
            programService
              .delete(selected!.id)
              .then(res => {
                ToastAndroid.show(`Program deleted!`, ToastAndroid.LONG);
              })
              .catch(e => {
                ToastAndroid.show(
                  `Could not delete program!`,
                  ToastAndroid.LONG,
                );
              });
            setSelected(undefined);
          },
        }}
        negativeButton={{
          onPress: () => {
            setSelected(undefined);
          },
        }}
        onDismiss={() => {
          setSelected(undefined);
        }}
      />
    </>
  );
};
