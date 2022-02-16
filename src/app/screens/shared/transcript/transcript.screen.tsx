import userService from '@app/services/user.service';
import TranscriptType from '@app/types/transcript.type';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {
  ActivityIndicator,
  Caption,
  Card,
  DataTable,
  Text,
  Title,
} from 'react-native-paper';
import {colors} from '@app/styles';
import {
  transcriptCourseRoute,
  transcriptPLORoute,
} from '@app/routes/shared.routes';
import {ResultType} from '@app/types';

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

let t: TranscriptType | undefined;

let id: any;

export default function TranscriptScreen() {
  const route = useRoute<any>();
  const {user} = route.params;
  id = route.params!.user.id;

  t = useTranscript(user.id);

  return t ? (
    <ScrollView>
      <Card style={{margin: 8}}>
        <Text style={{textAlign: 'center'}}>{user.username}</Text>
        <Caption style={{textAlign: 'center'}}>{user.id}</Caption>
        <CoursesTable />
        <PLOsTable />
      </Card>
    </ScrollView>
  ) : (
    <ActivityIndicator style={{flexGrow: 1}} size="large" />
  );
}

const CoursesTable = () => {
  const nav = useNavigation();
  return (
    <Card style={{margin: 8, overflow: 'hidden'}}>
      <DataTable>
        <DataTable.Header style={{backgroundColor: colors.primarySubtle}}>
          <DataTable.Title>Course</DataTable.Title>
          <DataTable.Title>Grade</DataTable.Title>
        </DataTable.Header>
        {t!.courses.map(c => {
          const p = c.achieved / c.total;
          const g =
            p >= 0.8
              ? 'A'
              : p >= 0.65
              ? 'B'
              : p >= 0.5
              ? 'C'
              : p >= 0.4
              ? 'D'
              : 'F';
          return (
            <DataTable.Row
              onPress={() => {
                nav.navigate(transcriptCourseRoute.name, {
                  course: c,
                  transcript: t,
                  userId: id,
                });
              }}>
              <DataTable.Cell>{c.titleShort}</DataTable.Cell>
              <DataTable.Cell>{g}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </Card>
  );
};

const PLOsTable = () => {
  const [res, setRes] = useState<ResultType[]>();
  useEffect(() => {
    userService.getResults(id).then(r => {
      setRes(r.data);
    });
  }, []);
  const nav = useNavigation();
  return (
    <Card style={{margin: 8, overflow: 'hidden'}}>
      {res ? (
        <DataTable>
          <DataTable.Header style={{backgroundColor: colors.primarySubtle}}>
            <DataTable.Title>PLO</DataTable.Title>
            <DataTable.Title>Result</DataTable.Title>
          </DataTable.Header>
          {t!.plos.map(p => {
            const prog =
              isPassed(res.find(r => r.plo.id === p.id)!) === undefined;
            const ach = t!.achieved.filter(a => a.plo.id === p.id);
            const tot =
              ach.length > 0
                ? ach.map(a => a.achieved).reduce((a, b) => a + b)
                : 0;
            const pass = tot > p.passing;
            const color = pass ? colors.green : colors.red;
            return (
              <DataTable.Row
                style={{backgroundColor: color + '22'}}
                onPress={() =>
                  nav.navigate(transcriptPLORoute.name, {plo: p, transcript: t})
                }>
                <DataTable.Cell>PLO {p.number}</DataTable.Cell>
                <DataTable.Cell>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color,
                    }}>
                    {pass ? 'P' : 'F'}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      ) : (
        <ActivityIndicator style={{alignSelf: 'center', margin: 16}} />
      )}
    </Card>
  );
};

const isPassed = (item: ResultType) => {
  const {achieved, evaluated} = item;
  const passing = item.plo!.passing!;
  const maxAchievable = 100 - evaluated;
  if (achieved < passing) {
    if (maxAchievable + achieved < passing) return false;
    return undefined;
  }
  return true;
};
