import {ManyCriteria} from '@app/models/criteria';
import cloService from '@app/services/clo.service';
import objectiveMapService from '@app/services/objective-map.service';
import programPloService from '@app/services/program-plo.service';
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

export type PLOWeightedType = PLOType & {number: number; weight: number};

export default function AddCloScreen() {
  const [plos, setPlos] = useState<PLOWeightedType[]>();
  const [saving, setSaving] = useState(false);
  const route = useRoute<{params: ParamsType; key: string; name: string}>();
  const navigation = useNavigation();

  const {course, program, clos, onAdd} = route.params;

  useEffect(() => {
    navigation.setOptions({headerTitle: `Add ${course.title} CLO`});

    const criteria = new ManyCriteria<any>();
    criteria.addCondition('program', program.id);
    criteria.addRelation('plo');

    programPloService.get(criteria).then(r => {
      const plos: PLOWeightedType[] = r.data.map(d => ({
        ...d.plo!,
        number: d.number,
        weight: 0,
      }));
      objectiveMapService.get(criteria).then(r => {
        const maps = r.data;
        maps.forEach(m => {
          const ind = plos.findIndex(p => p.id === m.plo!.id);
          plos[ind].weight += m.weight;
        });
        setPlos(sortPlos(plos));
      });
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

const sortPlos = (plos: (PLOType & {number: number; weight: number})[]) =>
  plos.sort((a, b) => a.number - b.number);
