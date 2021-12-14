import {IconMessageView} from '@app/components/icon-message-view';
import {ManyCriteria} from '@app/models/criteria';
import programPloService from '@app/services/program-plo.service';
import uiService from '@app/services/ui.service';
import {ProgramPloType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {FlatList, useWindowDimensions, View} from 'react-native';
import {ActivityIndicator, Card, FAB, Text, Title} from 'react-native-paper';
import AddPloModal from './add-plo.modal';

export default function ProgramPlosScreen() {
  const [modal, setModal] = useState(false);
  const [maps, setMaps] = useState<ProgramPloType[]>();
  const route = useRoute<any>();
  const navigation = useNavigation();
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
      <FlatList
        data={maps}
        renderItem={({item}) => (
          <Card style={{margin: 16, marginVertical: 8, padding: 8}}>
            <Title>PLO {item.number}</Title>
            <Text>
              {item.plo!.title}: {item.plo!.description}
            </Text>
          </Card>
        )}
        ListEmptyComponent={
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
        }
      />
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
    </>
  ) : (
    <ActivityIndicator style={{flexGrow: 1, alignSelf: 'center'}} />
  );
}

const sortMaps = (maps: ProgramPloType[]) =>
  maps.sort((a, b) => a.number - b.number);
