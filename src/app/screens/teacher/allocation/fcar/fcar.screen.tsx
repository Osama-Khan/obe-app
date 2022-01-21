import {AllocationType} from '@app/types';
import {useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import {Text, Card, Title, Caption} from 'react-native-paper';

export default function FCARScreen() {
  const route = useRoute<any>();
  const allocation: AllocationType = route.params!.allocation;
  return (
    <ScrollView>
      <Card>
        <Caption style={{textAlign: 'center'}}>
          Faculty Course Assessment Report
        </Caption>
        <Title style={{textAlign: 'center'}}>{allocation.section!.id}</Title>
        <Text style={{textAlign: 'center'}}>{allocation.course!.title}</Text>
      </Card>
    </ScrollView>
  );
}
