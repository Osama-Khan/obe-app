import {DataTable} from '@app/components/data-table';
import {IconMessageView} from '@app/components/icon-message-view';
import {ConfirmModal} from '@app/components/modal';
import {ManyCriteria} from '@app/models/criteria';
import {ploMappingsRoute} from '@app/routes/hod.routes';
import programPloService from '@app/services/program-plo.service';
import uiService from '@app/services/ui.service';
import {colors} from '@app/styles';
import {ProgramPloType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {
  ActivityIndicator,
  Card,
  FAB,
  IconButton,
  Text,
} from 'react-native-paper';
import AddPloModal from './add-plo.modal';

export default function ProgramPlosScreen() {
  const [modal, setModal] = useState(false);
  const [deleting, setDeleting] = useState<ProgramPloType>();
  const [maps, setMaps] = useState<ProgramPloType[]>();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const program = route.params!.program;
  const height = useWindowDimensions().height - 92;

  useMemo(() => {
    const criteria = new ManyCriteria<ProgramPloType>();
    criteria.addRelation('plo');
    criteria.addCondition('program', program.id);
    navigation.setOptions({headerTitle: program.title + ' PLOs'});
    programPloService
      .get(criteria)
      .then(res => setMaps(sortMaps(res.data)))
      .catch(() => uiService.toastError('Failed to fetch PLOs'));
  }, []);

  return maps ? (
    <>
      {maps.length > 0 ? (
        <Card style={{margin: 8}}>
          <DataTable
            data={maps}
            rowOnPress={item => {
              navigation.navigate(ploMappingsRoute.name, {
                plo: item.plo,
                program,
                ploNumber: item.number,
              });
            }}
            columns={[
              {
                title: 'Number',
                selector: ({item}) => <Text>PLO {item.number}</Text>,
                weight: 0.2,
              },
              {
                title: 'Title',
                selector: ({item}) => <Text>{item.plo!.title}</Text>,
                weight: 0.6,
              },
              {
                title: 'Unlink',
                selector: ({item}) => (
                  <View style={{alignSelf: 'center'}}>
                    <IconButton
                      color={colors.red}
                      icon="link-off"
                      onPress={() => {
                        setDeleting(item);
                      }}
                    />
                  </View>
                ),
                weight: 0.2,
              },
            ]}
          />
        </Card>
      ) : (
        <View style={{height, justifyContent: 'center'}}>
          <IconMessageView
            icon="graph"
            caption="This program has no PLOs. Start by adding one."
            title="No PLOs"
            btnProps={{
              icon: 'plus',
              text: 'Add PLO',
              action: () => setModal(true),
            }}
          />
        </View>
      )}
      <FAB
        icon="plus"
        style={{position: 'absolute', bottom: 16, right: 16}}
        onPress={() => setModal(true)}
      />
      <AddPloModal
        visible={modal}
        maps={maps}
        onDismiss={() => setModal(false)}
        program={program}
        onAdd={(plo, number) => {
          setMaps(sortMaps([...maps, {plo, number}]));
          setModal(false);
        }}
      />
      {deleting && (
        <ConfirmModal
          title={`Unlink PLO ${deleting.number}?`}
          description={`Are you sure you want to unlink the PLO "${
            deleting.plo!.title
          }"?`}
          visible={!!deleting}
          positiveButton={{
            onPress: () => {
              programPloService
                .delete(deleting!.id)
                .then(res => {
                  uiService.toastSuccess('PLO unlinked!');
                  setMaps(maps.filter(m => m.id !== res.data.id));
                })
                .catch(() => {
                  uiService.toastError('Could not unlink PLO!');
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
  ) : (
    <ActivityIndicator style={{flexGrow: 1, alignSelf: 'center'}} />
  );
}

const sortMaps = (maps: ProgramPloType[]) =>
  maps.sort((a, b) => a.number - b.number);
