import {ManyCriteria} from '@app/models/criteria';
import objectiveMapService from '@app/services/objective-map.service';
import programPloService from '@app/services/program-plo.service';
import uiService from '@app/services/ui.service';
import {
  CLOType,
  CourseType,
  ObjectiveMapType,
  PLOType,
  ProgramType,
} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {
  Caption,
  ActivityIndicator,
  Card,
  TextInput,
  List,
  Button,
} from 'react-native-paper';

type ParamsType = {
  /** Called with the added CLO when a CLO is added */
  onEdit: (clo: Partial<CLOType>) => void;

  /** CLO that is being edited */
  clo: CLOType;

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

  const {clo, program, onEdit} = route.params;
  const [maps, setMaps] = useState(clo.maps!);

  const isMapValid = (map: ObjectiveMapType, assigned?: number) => {
    if (!plos) return false;
    assigned = assigned || plos.find(p => p.id === map.plo!.id)!.weight;
    if (assigned === 100) return;
    const maxWeight = 100 - assigned;
    return map.weight > 0 && map.weight <= maxWeight;
  };
  useEffect(() => {
    navigation.setOptions({headerTitle: `Edit CLO ${clo.number}`});

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
          <>
            <Caption>
              {clo.title}: {clo.description}
            </Caption>
            <List.Section title="PLOs">
              {maps!.map(m => {
                const assigned = plos.find(p => p.id === m.plo!.id)!.weight;
                return (
                  <List.Item
                    title={m.plo!.title}
                    description={`${assigned}% assigned`}
                    right={() => (
                      <TextInput
                        mode="outlined"
                        value={m.weight.toString()}
                        onChangeText={w => {
                          const n = parseInt(w);
                          if (n.toString() !== w) {
                            return;
                          }
                          const i = maps.findIndex(map => map.id === m.id);
                          maps[i].weight = n;
                          setMaps([...maps]);
                        }}
                        style={{textAlign: 'right'}}
                        maxLength={assigned === 0 ? 3 : assigned > 90 ? 1 : 2}
                        disabled={assigned === 100}
                        error={!isMapValid(m, assigned)}
                        dense
                      />
                    )}
                  />
                );
              })}
            </List.Section>
            <Button
              icon="check"
              loading={saving}
              disabled={saving || !maps.every(isMapValid)}
              onPress={async () => {
                setSaving(true);
                try {
                  for (const m of maps) {
                    await objectiveMapService.update(m.id, {weight: m.weight});
                  }
                  uiService.toastSuccess('Successfully updated all weights!');
                  onEdit(clo);
                  navigation.goBack();
                } catch (_) {
                  uiService.toastError('Could not update all weights!');
                } finally {
                  setSaving(false);
                }
              }}>
              Save
            </Button>
          </>
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
