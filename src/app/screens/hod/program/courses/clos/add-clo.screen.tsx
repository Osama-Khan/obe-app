import {ManyCriteria} from '@app/models/criteria';
import cloService from '@app/services/clo.service';
import programPloService from '@app/services/program-plo.service';
import uiService from '@app/services/ui.service';
import {
  CLOType,
  CourseType,
  PLOType,
  ProgramPloType,
  ProgramType,
} from '@app/types';
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

export type PLOWeightedType = PLOType & {number: number; weight: number};

export default function AddCloScreen() {
  const [plos, setPlos] = useState<PLOWeightedType[]>();
  const [saving, setSaving] = useState(false);
  const route = useRoute<{params: ParamsType; key: string; name: string}>();
  const navigation = useNavigation();

  const {course, program, clos, onAdd} = route.params;

  const getPloWeight = (ploId: string) => {
    let weight = 0;
    clos.forEach(c => {
      const map = c.maps!.find(map => map.plo!.id === ploId);
      if (map) weight += map.weight;
    });
    return weight;
  };

  useEffect(() => {
    navigation.setOptions({headerTitle: `Add ${course.title} CLO`});
    const criteria = new ManyCriteria<ProgramPloType>();
    criteria.addCondition('program', program.id);
    criteria.addRelation('plo');

    programPloService.get(criteria).then(r =>
      setPlos(
        r.data.map(
          d =>
            ({
              ...d.plo,
              number: d.number,
              weight: getPloWeight(d.plo!.id),
            } as any),
        ),
      ),
    );
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
                  onAdd(clo);
                  navigation.goBack();
                })
                .catch(() => {
                  uiService.toastError('Failed to add CLO!');
                })
                .finally(() => {
                  setSaving(false);
                });
            }}
            {...{course, clos, plos}}
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
