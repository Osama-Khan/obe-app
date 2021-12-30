import {FetchingDataTable} from '@app/components/data-table';
import {ManyCriteria} from '@app/models/criteria';
import objectiveMapService from '@app/services/objective-map.service';
import {PLOType, ProgramType} from '@app/types';
import ObjectiveMapType from '@app/types/objective-map.type';
import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {Caption, Card, List, Text} from 'react-native-paper';

export default function PLOMappingsScreen() {
  const route = useRoute<any>();
  const plo: PLOType = route.params!.plo;
  const program: ProgramType = route.params!.program;
  const ploNumber: number = route.params!.ploNumber;
  return (
    <ScrollView>
      <View style={{marginHorizontal: 16, marginTop: 16}}>
        <Text>
          {program.title} PLO {ploNumber}
        </Text>
        <Caption>
          {plo.title}: {plo.description}
        </Caption>
      </View>
      <List.Section title="Mappings">
        <Card style={{margin: 8}}>
          <FetchingDataTable
            criteria={getCriteria(plo.id)}
            fetchMethod={c => objectiveMapService.get(c)}
            columns={[
              {
                title: 'Name',
                selector: ({item}) => <Text>CLO {item.clo!.number}</Text>,
                weight: 0.5,
              },
              {
                title: 'Weight (%)',
                selector: 'weight',
                weight: 0.5,
              },
              {
                title: 'Description',
                selector: ({item}) => (
                  <Text
                    onPress={() =>
                      Alert.alert(item.clo!.title!, item.clo!.description)
                    }>
                    {item.clo!.title}: {item.clo!.description}
                  </Text>
                ),
              },
            ]}
          />
        </Card>
      </List.Section>
    </ScrollView>
  );
}

const getCriteria = (ploId: string) => {
  const criteria = new ManyCriteria<ObjectiveMapType>();
  criteria.addCondition('plo', ploId);
  criteria.addRelation('clo');
  return criteria;
};
