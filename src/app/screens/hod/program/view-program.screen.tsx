import {FetchingDataTable} from '@app/components/data-table';
import {ConfirmModal} from '@app/components/modal';
import {ManyCriteria} from '@app/models/criteria';
import programService from '@app/services/program.service';
import uiService from '@app/services/ui.service';
import ProgramType from '@app/types/program.type';
import {NavigationProp} from '@react-navigation/core';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Card, IconButton, Text} from 'react-native-paper';
import {addProgramRoute, editProgramRoute} from '@app/routes/hod.routes';

type P = {navigation: NavigationProp<any>};
const criteria = new ManyCriteria<ProgramType>();
criteria.addRelation('courses');
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
          disabled={selected.length !== 1}
          color="#0af"
          onPress={() => {
            navigation.navigate(editProgramRoute.name, {
              programId: selected[0].id,
            });
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
        <FetchingDataTable
          fetchMethod={criteria => programService.get(criteria)}
          criteria={criteria}
          checkProperty="id"
          columns={[
            {title: 'Title', selector: 'title'},
            {
              title: 'Courses',
              selector: ({item}) => {
                const num = item.courses?.length;
                let text;
                if (num && num > 0) {
                  text = item.courses
                    ?.slice(0, 2)
                    .map(c => c.title)
                    .join(', ');
                  if (num > 2) text += ', ...';
                } else {
                  text = 'N/A';
                }
                return <Text>{text}</Text>;
              },
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
                uiService.toastSuccess('Programs deleted!');
              })
              .catch(e => {
                uiService.toastError('Could not delete all programs!');
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
