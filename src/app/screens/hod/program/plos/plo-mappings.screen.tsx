import {FetchingDataTable} from '@app/components/data-table';
import ploService from '@app/services/plo.service';
import {PLOType, ProgramType} from '@app/types';
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
            fetchMethod={() => ploService.getMappings(plo.id)}
            columns={[
              {
                title: 'Course',
                selector: ({item}) => (
                  <Text>{item.clo!.course!.titleShort}</Text>
                ),
              },
              {
                title: 'Name',
                selector: ({item}) => <Text>CLO {item.clo!.number}</Text>,
              },
              {
                title: 'Weight (%)',
                selector: 'weight',
              },
            ]}
            rowOnPress={item =>
              Alert.alert(item.clo!.title!, item.clo!.description)
            }
          />
        </Card>
      </List.Section>
    </ScrollView>
  );
}
