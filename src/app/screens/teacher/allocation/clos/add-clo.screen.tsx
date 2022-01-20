import {Criteria} from '@app/models/criteria';
import cloService from '@app/services/clo.service';
import courseService from '@app/services/course.service';
import uiService from '@app/services/ui.service';
import {CLOType, CourseType, PLOType, ProgramType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Caption, ActivityIndicator, Card} from 'react-native-paper';
import AddCLOForm from './components/add-clo.form';

export type ParamsType = {
  /** Called with the added CLO when a CLO is added */
  onAdd: (clo: Partial<CLOType>) => void;

  /** CLOs that are already assigned to the course*/
  clos: CLOType[];

  /** The course the CLO is being added to */
  course: CourseType;

  /** The program the course exists in */
  program: ProgramType;
};

export default function AddCloScreen() {
  const [plos, setPlos] = useState<PLOType[]>();
  const [saving, setSaving] = useState(false);
  const route = useRoute<{params: ParamsType; key: string; name: string}>();
  const navigation = useNavigation();

  const {course, program, clos, onAdd} = route.params;

  useEffect(() => {
    navigation.setOptions({headerTitle: `Add ${course.titleShort} CLO`});
    fetchPlos(course.id).then(plos => {
      setPlos(plos);
    });
  }, []);

  return (
    <ScrollView>
      <Card style={{margin: 8, padding: 8}}>
        {saving ? (
          <SavingView />
        ) : plos ? (
          <AddCLOForm
            onAdd={clo => {
              setSaving(true);
              cloService
                .insert(clo)
                .then(r => {
                  uiService.toastSuccess('New CLO Added!');
                  onAdd({...clo, ...r.data});
                  navigation.goBack();
                })
                .catch(() => {
                  uiService.toastError('Failed to add CLO!');
                })
                .finally(() => {
                  setSaving(false);
                });
            }}
            {...{course, clos, plos, program}}
          />
        ) : (
          <ActivityIndicator style={{alignSelf: 'center', margin: 16}} />
        )}
      </Card>
    </ScrollView>
  );
}

const SavingView = () => (
  <>
    <ActivityIndicator style={{alignSelf: 'center'}} />
    <Caption style={{alignSelf: 'center'}}>Adding CLO</Caption>
  </>
);

const fetchPlos = async (courseId: string) => {
  const courseCrit = new Criteria<CourseType>();
  courseCrit.addRelation('plos');
  courseCrit.addSelect('id');
  const course = await courseService.getOne(courseId, courseCrit);
  if (!course) {
    uiService.toastError('Course not found!');
    return undefined;
  }
  return course.data.plos;
};
