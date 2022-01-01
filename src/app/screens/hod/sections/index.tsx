import {FetchingDataTable} from '@app/components/data-table';
import {ManyCriteria} from '@app/models/criteria';
import sectionService from '@app/services/section.service';
import {SectionType} from '@app/types';
import React from 'react';
import {ScrollView} from 'react-native';
import {Card, Text} from 'react-native-paper';

export default function SectionsScreen() {
  return (
    <ScrollView>
      <Card style={{margin: 16, marginBottom: 96}}>
        <FetchingDataTable
          criteria={new ManyCriteria<SectionType>({relations: ['program']})}
          fetchMethod={c => sectionService.get(c)}
          columns={[
            {
              title: 'Program',
              selector: ({item}) => <Text>{item.program!.title}</Text>,
            },
            {
              title: 'Semester',
              selector: 'semester',
            },
            {
              title: 'Name',
              selector: 'name',
            },
          ]}
        />
      </Card>
    </ScrollView>
  );
}
