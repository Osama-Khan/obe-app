import userService from '@app/services/user.service';
import TranscriptType from '@app/types/transcript.type';
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleProp, ViewStyle} from 'react-native';
import {ActivityIndicator, Card, DataTable} from 'react-native-paper';

const useTranscript = (id: string) => {
  const [t, set] = useState<TranscriptType>();
  useEffect(() => {
    userService.getTranscript(id).then(r => {
      const plos = r.data.plos.sort((a, b) => a.number - b.number);
      set({...r.data, plos});
    });
  }, []);
  return t;
};

export default function TranscriptScreen() {
  const route = useRoute<any>();
  const userId: string = route.params!.id;

  const t = useTranscript(userId);
  const ploTotals: number[] = [];

  return t ? (
    <ScrollView>
      <Card style={{margin: 8}}>
        <ScrollView horizontal>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={cellStyle}>Courses</DataTable.Title>
              {t.plos.map(p => (
                <DataTable.Title style={cellStyle}>
                  PLO {p.number}
                </DataTable.Title>
              ))}
            </DataTable.Header>
            {t.courses.map(c => (
              <DataTable.Row>
                <DataTable.Title style={cellStyle}>
                  {c.titleShort}
                </DataTable.Title>
                {t.plos.map((p, i) => {
                  const ach = t.achieved.find(
                    a => a.plo.id === p.id && a.course.id === c.id,
                  )?.achieved;
                  if (ploTotals.length <= i) ploTotals.push(0);
                  ploTotals[i] += ach ? ach : 0;
                  return (
                    <DataTable.Cell style={cellStyle}>
                      {ach?.toFixed(1) || '—'}
                    </DataTable.Cell>
                  );
                })}
              </DataTable.Row>
            ))}
            <DataTable.Row>
              <DataTable.Title style={cellStyle}>Total</DataTable.Title>
              {ploTotals.map(t => (
                <DataTable.Cell style={cellStyle}>
                  {t.toFixed(1)}%
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          </DataTable>
        </ScrollView>
      </Card>
    </ScrollView>
  ) : (
    <ActivityIndicator style={{flexGrow: 1}} size="large" />
  );
}

const cellStyle: StyleProp<ViewStyle> = {width: 64, justifyContent: 'center'};
