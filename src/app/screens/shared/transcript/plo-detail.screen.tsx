import {PLOType} from '@app/types';
import TranscriptType from '@app/types/transcript.type';
import {useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Caption, Card, DataTable, Title} from 'react-native-paper';

export default function TranscriptPLOScreen() {
  const route = useRoute<any>();
  const {plo, transcript: t}: {plo: PLOType; transcript: TranscriptType} =
    route.params!;
  return (
    <>
      <View style={{margin: 8}}>
        <Title>PLO {plo.number}</Title>
        <Caption>
          {plo.title}: {plo.description}
        </Caption>
      </View>
      <Card style={{margin: 8}}>
        <ScrollView horizontal>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={cellStyle} />
              {t.courses.map(c => (
                <DataTable.Title style={cellStyle}>
                  {c.titleShort}
                </DataTable.Title>
              ))}
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Title style={cellStyle}>
                PLO {plo.number}
              </DataTable.Title>
              {t.courses.map((c, i) => {
                const ach = t.achieved.find(
                  a => a.plo.id === plo.id && a.course.id === c.id,
                )?.achieved;
                return (
                  <DataTable.Cell style={cellStyle}>
                    {ach !== undefined ? ach.toFixed(1) + '%' : '—'}
                  </DataTable.Cell>
                );
              })}
            </DataTable.Row>
          </DataTable>
        </ScrollView>
      </Card>
    </>
  );
}

const cellStyle = {width: 64};
