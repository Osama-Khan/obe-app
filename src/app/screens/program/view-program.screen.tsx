import {FetchingDataTable} from '@app/components/data-table';
import {FetchingCardList} from '@app/components/listing';
import {ConfirmModal} from '@app/components/modal';
import programService from '@app/services/program.service';
import ProgramType from '@app/types/program.type';
import {NavigationProp} from '@react-navigation/core';
import React, {useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import {Button, Card, IconButton, Text} from 'react-native-paper';
import {addProgramRoute} from 'src/app.routes';

type P = {navigation: NavigationProp<any>};
export const ViewProgramScreen = ({navigation}: P) => {
  const [selected, setSelected] = useState<ProgramType[]>([]);
  const [modalShown, setModalShown] = useState(false);
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <IconButton
          icon="delete"
          style={{margin: 8, marginLeft: 'auto'}}
          disabled={selected.length < 1}
          color="red"
          onPress={() => {
            setModalShown(true);
          }}
        />
        <IconButton
          icon="pencil"
          style={{margin: 8}}
          disabled={selected.length < 1}
          color="#0af"
          onPress={() => {
            //TODO: Edit stuff
          }}
        />
        <Button
          icon="plus"
          style={{margin: 8}}
          mode="contained"
          onPress={() => navigation.navigate(addProgramRoute.name)}>
          Add
        </Button>
      </View>
      <Card style={{margin: 8}} elevation={8}>
        <FetchingDataTable<ProgramType>
          fetchMethod={() => programService.get()}
          checkProperty="id"
          columns={[
            {title: 'ID', property: 'id'},
            {title: 'Title', property: 'title'},
            {
              title: 'Courses',
              property: ({item}) => (
                <Text>
                  {item.courses
                    ? item.courses?.splice(0, 2).join(',') + '...'
                    : 'N/A'}
                </Text>
              ),
            },
          ]}
          onCheckedChange={checked => {
            setSelected(checked);
          }}
          itemsPerPage={2}
        />
      </Card>
      <ConfirmModal
        title={`Delete ${
          selected.length === 1 ? 'Program' : 'Multiple Programs'
        }`}
        description={`Are you sure you want to delete ${
          selected.length === 1
            ? `the program "${selected[0].title}"`
            : `the ${selected.length} selected programs`
        }?`}
        visible={modalShown}
        positiveButton={{
          onPress: () => {
            Promise.all(selected.map(p => programService.delete(p.id)))
              .then(res => {
                ToastAndroid.show(`Programs deleted!`, ToastAndroid.LONG);
              })
              .catch(e => {
                ToastAndroid.show(
                  `Could not delete all programs!`,
                  ToastAndroid.LONG,
                );
              });
            setSelected([]);
            setModalShown(false);
          },
        }}
        negativeButton={{
          onPress: () => {
            setModalShown(false);
          },
        }}
        onDismiss={() => {
          setModalShown(false);
        }}
      />
    </>
  );
};
