import {ConfirmModal} from '@app/components/modal';
import {ManyCriteria} from '@app/models/criteria';
import programService from '@app/services/program.service';
import uiService from '@app/services/ui.service';
import ProgramType from '@app/types/program.type';
import {NavigationProp} from '@react-navigation/core';
import React, {useState} from 'react';
import {View} from 'react-native';
import {
  Button,
  Card,
  Divider,
  FAB,
  IconButton,
  Searchbar,
  Title,
} from 'react-native-paper';
import {
  addProgramRoute,
  programCoursesRoute,
  programPlosRoute,
} from '@app/routes/hod.routes';
import {FetchingFlatList} from '@app/components/listing';

type P = {navigation: NavigationProp<any>};
const criteria = new ManyCriteria<ProgramType>();
criteria.addRelation('courses');
export const ViewProgramScreen = ({navigation}: P) => {
  const [selected, setSelected] = useState<ProgramType[]>([]);
  const [modalShown, setModalShown] = useState(false);
  const [search, setSearch] = useState('');
  return (
    <>
      <Searchbar
        placeholder="Search Programs..."
        value={search}
        onChangeText={setSearch}
        style={{margin: 16, marginBottom: 0}}
      />
      <FetchingFlatList
        fetchMethod={criteria => programService.get(criteria)}
        criteria={criteria}
        filter={item => item.title.includes(search)}
        renderItem={({item}) => (
          <Card style={{margin: 16, marginVertical: 8, overflow: 'hidden'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Title style={{margin: 16, marginVertical: 16}}>
                {item.title}
              </Title>
              <IconButton icon="chevron-right" />
            </View>
            <Divider />
            <Button
              icon="graph"
              style={{borderRadius: 0}}
              onPress={() => {
                navigation.navigate(programPlosRoute.name, {program: item});
              }}>
              PLOs
            </Button>
            <Divider />
            <Button
              icon="bookshelf"
              style={{borderRadius: 0}}
              onPress={() => {
                navigation.navigate(programCoursesRoute.name, {program: item});
              }}>
              Courses
            </Button>
          </Card>
        )}
      />
      <FAB
        icon="plus"
        style={{position: 'absolute', bottom: 8, right: 8}}
        onPress={() => navigation.navigate(addProgramRoute.name)}
      />

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
