import {FetchingFlatList} from '@app/components/listing';
import {ManyCriteria} from '@app/models/criteria';
import programPloService from '@app/services/program-plo.service';
import {ProgramPloType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Card, Text, Title} from 'react-native-paper';

const criteria = new ManyCriteria<ProgramPloType>();

export default function ProgramPlosScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const program = route.params!.program;

  useMemo(() => {
    criteria.addRelation('program');
    criteria.addRelation('plo');
    criteria.addCondition('program', program.id);
    navigation.setOptions({headerTitle: program.title + ' PLOs'});
  }, []);
  return (
    <FetchingFlatList
      fetchMethod={c => programPloService.get(c)}
      criteria={criteria}
      renderItem={({item}) => (
        <Card style={{margin: 16, marginVertical: 8, padding: 8}}>
          <Title>PLO {item.number}</Title>
          <Text>
            {item.plo!.title}: {item.plo!.description}
          </Text>
        </Card>
      )}
    />
  );
}
