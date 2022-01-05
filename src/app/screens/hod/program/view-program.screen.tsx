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
  editProgramRoute,
  programCoursesRoute,
  programPlosRoute,
} from '@app/routes/hod.routes';
import {FetchingFlatList} from '@app/components/listing';
import {colors} from '@app/styles';

type P = {navigation: NavigationProp<any>};
const criteria = new ManyCriteria<ProgramType>();
criteria.addRelation('courses');
export const ViewProgramScreen = ({navigation}: P) => {
  const [deleting, setDeleting] = useState<ProgramType>();
  const [updates, setUpdates] = useState(0);
  const [search, setSearch] = useState('');
  const reloadList = () => setUpdates(updates + 1);

  return (
    <>
      <Searchbar
        placeholder="Search Programs..."
        value={search}
        onChangeText={setSearch}
        style={{margin: 16, marginBottom: 0}}
      />
      <FetchingFlatList
        key={updates}
        fetchMethod={criteria => programService.get(criteria)}
        criteria={criteria}
        filter={item => item.title.includes(search)}
        renderItem={({item}) => (
          <Card
            style={{
              margin: 16,
              marginVertical: 8,
              overflow: 'hidden',
              borderTopWidth: 2,
              borderColor: colors.primary,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Title style={{margin: 16, marginVertical: 16}}>
                {item.title}
              </Title>
              <View style={{flexDirection: 'row'}}>
                <IconButton
                  icon="delete"
                  style={{backgroundColor: colors.redSubtle}}
                  color={colors.red}
                  onPress={() => {
                    setDeleting(item);
                  }}
                />
                <IconButton
                  icon="pencil"
                  style={{backgroundColor: colors.primarySubtle}}
                  color={colors.primary}
                  onPress={() => {
                    navigation.navigate(editProgramRoute.name, {
                      programId: item.id,
                      onEdit: reloadList,
                    });
                  }}
                />
              </View>
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
        onPress={() =>
          navigation.navigate(addProgramRoute.name, {
            onAdd: reloadList,
          })
        }
      />

      {deleting && (
        <ConfirmModal
          title={'Delete Program?'}
          description={`Are you sure you want to delete the program "${deleting.title}"?`}
          visible={!!deleting}
          positiveButton={{
            onPress: () => {
              programService
                .delete(deleting!.id)
                .then(res => {
                  uiService.toastSuccess('Program deleted!');
                  reloadList();
                })
                .catch(e => {
                  uiService.toastError('Could not delete program!');
                });
              setDeleting(undefined);
            },
          }}
          negativeButton={{
            onPress: () => {
              setDeleting(undefined);
            },
          }}
          onDismiss={() => {
            setDeleting(undefined);
          }}
        />
      )}
    </>
  );
};
