import {Criteria, ManyCriteria} from '@app/models/criteria';
import activityService from '@app/services/activity.service';
import sectionService from '@app/services/section.service';
import uiService from '@app/services/ui.service';
import {colors} from '@app/styles';
import {ActivityType, SectionType, UserType} from '@app/types';
import {EvaluationType} from '@app/types/activity.type';
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Caption,
  Card,
  Title,
  Text,
  Divider,
} from 'react-native-paper';
import {validateMarks} from './helpers';
import {MarksInput} from './MarksInput';

const useStudents = (sectionId: string) => {
  const [students, setStudents] = useState<UserType[]>();
  useEffect(() => {
    const crit = new ManyCriteria<SectionType>();
    crit.addRelation('users');
    sectionService
      .getOne(sectionId, crit)
      .then(r => {
        setStudents(r.data.users);
      })
      .catch(e => uiService.toastError('Could not fetch students!'));
  }, []);
  return students;
};

const useEvaluations = (activityId: string) => {
  const [evaluations, setEvaluations] = useState<EvaluationType[]>();
  useEffect(() => {
    const crit = new Criteria<ActivityType>();
    crit.addRelation('evaluations');
    activityService.getOne(activityId, crit).then(a => {
      setEvaluations(a.data.evaluations!);
    });
  }, []);
  return evaluations;
};

export default function EvaluationScreen() {
  const [studentMarks, setStudentMarks] = useState<
    {id: string; marks: string}[]
  >([]);
  const [saving, setSaving] = useState(false);
  const route = useRoute<any>();
  const {activity, allocation} = route.params;
  const students = useStudents(allocation.section.id);
  const evaluations = activity.evaluations
    ? useEvaluations(activity.id)
    : false;

  useEffect(() => {
    if (students && (evaluations || evaluations === false)) {
      setStudentMarks(
        students.map(s => {
          const evaluation = evaluations
            ? evaluations.find(e => e.user!.id === s.id)
            : false;
          return {
            id: s.id,
            marks: evaluation ? evaluation.marks.toString() : '',
          };
        }),
      );
    }
  }, [students, evaluations]);

  return (
    <ScrollView>
      <View style={{padding: 16, backgroundColor: colors.primaryDark}}>
        <Title style={{color: 'white'}}>{activity.title}</Title>
        <Caption style={{color: 'white', opacity: 0.7}}>
          Total Marks: {activity.marks}
        </Caption>
      </View>
      <Card style={{padding: 8, margin: 8}}>
        {studentMarks.length > 0 ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Caption style={{width: '33%'}}>Arid#</Caption>
              <Caption style={{width: '33%'}}>Name</Caption>
              <Caption style={{width: '33%'}}>Obtained Marks</Caption>
            </View>
            <Divider />
            {students!.map((item, index) => (
              <>
                <View
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 54,
                  }}>
                  <Text style={{width: '33%'}}>{item.id}</Text>
                  <Text style={{width: '33%'}}>{item.username}</Text>
                  <View style={{width: '33%'}}>
                    <MarksInput
                      marks={studentMarks[index].marks}
                      onChangeMarks={(marks: string) => {
                        studentMarks[index] = {
                          id: item.id,
                          marks: marks,
                        };
                        setStudentMarks([...studentMarks]);
                      }}
                      totalMarks={activity.marks}
                    />
                  </View>
                </View>
                <Divider />
              </>
            ))}
          </>
        ) : students && students.length === 0 ? (
          <Caption
            style={{margin: 16, marginVertical: 16, alignSelf: 'center'}}>
            No students found!
          </Caption>
        ) : (
          <ActivityIndicator style={{margin: 16, alignSelf: 'center'}} />
        )}
      </Card>
      <Button
        mode="contained"
        style={{margin: 8}}
        disabled={
          saving ||
          studentMarks.length === 0 ||
          studentMarks.some(s => validateMarks(s.marks, activity.marks))
        }
        loading={saving}
        onPress={async () => {
          setSaving(true);
          const sub = studentMarks.map(m => ({
            user: {id: m.id},
            marks: parseInt(m.marks),
          }));
          try {
            await activityService.setEvaluation(activity.id, sub);
            uiService.toastSuccess('Evaluations saved successfully!');
          } catch {
            uiService.toastError('Failed to save evaluations!');
          } finally {
            setSaving(false);
          }
        }}>
        Save
      </Button>
    </ScrollView>
  );
}
