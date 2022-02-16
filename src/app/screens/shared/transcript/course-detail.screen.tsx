import {ManyCriteria} from '@app/models/criteria';
import {FindConditionSet} from '@app/models/criteria/Conditions';
import activityService from '@app/services/activity.service';
import remarksService from '@app/services/remarks.service';
import {ActivityTypeType, CourseType} from '@app/types';
import {RemarksType} from '@app/types/remarks.type';
import TranscriptType from '@app/types/transcript.type';
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {
  ActivityIndicator,
  Caption,
  Card,
  DataTable,
  Text,
} from 'react-native-paper';

export default function TranscriptCourseScreen() {
  const route = useRoute<any>();
  const [types, setTypes] = useState<ActivityTypeType[]>();
  const [remarks, setRemarks] = useState<RemarksType | false>();
  const [found, setFound] = useState();

  const course: CourseType = route.params!.course;
  const userId = route.params!.userId;
  const transcript: TranscriptType = route.params!.transcript;

  useEffect(() => {
    const crit = new ManyCriteria<RemarksType>();
    const set = new FindConditionSet<RemarksType>();
    set.add('course', course.id);
    set.add('student', userId);
    crit.addConditionSet(set);
    crit.addRelation('section');
    crit.addRelation('teacher');
    remarksService.get(crit).then(r => {
      setRemarks(r.data ? (r.data.length > 0 ? r.data[0] : false) : undefined);
    });
  }, []);

  useEffect(() => {
    activityService.getTypes().then(r => {
      setTypes(r.data);
    });
  }, []);

  return (
    <>
      {remarks ? (
        <View style={{margin: 8}}>
          <Text>Teacher: {remarks.teacher?.username}</Text>
          <Text>Section: {remarks.section?.id}</Text>
          <Text>Remark: {remarks.text}</Text>
        </View>
      ) : remarks === false ? (
        <Caption style={{margin: 8}}>No Remarks...</Caption>
      ) : (
        <></>
      )}
      <Card style={{margin: 8}}>
        {types ? (
          <ScrollView horizontal>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={firstStyle} />
                {types.map(t => (
                  <DataTable.Title style={cellStyle}>{t.name}</DataTable.Title>
                ))}
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Title style={firstStyle}>
                  {course.titleShort}
                </DataTable.Title>
                {types.map((t, i) => {
                  // let ach;
                  // if (found) {
                  //   if (found > 70) {
                  //     ach = [43.01, 65.22, 45.92, 33.14, 74.52, 55.23];
                  //   } else if (found > 60) {
                  //     ach = [5.3, 99.82, 83.75, 94.67, 28.83, 7.91];
                  //   } else if (found > 50) {
                  //     [67.58, 33.74, 61.58, 29.09, 23.26, 3.19];
                  //   } else {
                  //     [18.93, 18.26, 26, 21.89, 42.31, 5.84];
                  //   }
                  // }
                  const courseActs = transcript.activities.filter(
                    a => a.course.id === course.id,
                  );
                  const acts = courseActs.filter(a => a.type.id === t.id);
                  const obtained =
                    acts.length > 0
                      ? acts.map(a => a.achieved).reduce((a, b) => a + b)
                      : undefined;
                  const total =
                    acts.length > 0
                      ? acts.map(a => a.marks).reduce((a, b) => a + b)
                      : undefined;
                  // if (acts.length > 0 && !found) {
                  //   setFound((obtained / total) * 100);
                  // }
                  return (
                    <DataTable.Cell style={cellStyle}>
                      {acts.length > 0
                        ? ((obtained / total) * 100).toFixed(2) + '%'
                        : //: ach
                          //? ach + '%'
                          '—'}
                    </DataTable.Cell>
                  );
                })}
              </DataTable.Row>
            </DataTable>
          </ScrollView>
        ) : (
          <ActivityIndicator />
        )}
      </Card>
    </>
  );
}

const firstStyle = {width: 32};

const cellStyle = {width: 80, justifyContent: 'center'};
