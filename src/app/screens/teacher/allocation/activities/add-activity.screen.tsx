import ListSelect from '@app/components/list-select';
import WeightPicker from '@app/components/WeightPicker';
import activityService from '@app/services/activity.service';
import uiService from '@app/services/ui.service';
import {colors} from '@app/styles';
import {
  ActivityType,
  ActivityTypeType,
  AllocationType,
  CLOType,
} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Caption,
  Card,
  TextInput,
  Title,
} from 'react-native-paper';
import useAssessments from '@app/hooks/useAssessments';

type ParamsType = {
  /** The allocation the activity is for */
  allocation: AllocationType;
  /** The clos available for the activity */
  clos: (CLOType & {weight: number})[];
  /** Called with the activity when an activity is added */
  onAdd: (activity: Partial<ActivityType>) => void;
};

type CountsType = {id: string; name: string; count: number};
type CloWeightsType = {id: string; weight: number};

export default function AddActivityScreen() {
  const [counts, setCounts] = useState<CountsType[]>();
  const [marks, setMarks] = useState('');
  const [type, setType] = useState<Partial<ActivityTypeType>>();
  const [clos, setClos] = useState<CLOType[]>();
  const [cloWeights, setCloWeights] = useState<CloWeightsType[]>();
  const [saving, setSaving] = useState(false);
  const route = useRoute<{params: ParamsType; key: string; name: string}>();
  const {allocation, onAdd} = route.params;
  const {assessments, types} = useAssessments(allocation.course!.id);
  const [added, setAdded] = useState<any>();
  const navigation = useNavigation();

  const getCloUsage = (id: string) => {
    return cloWeights?.find(c => c.id === id)?.weight || 0;
  };

  useEffect(() => {
    activityService.getActivityTypeCounts(allocation.section!.id).then(c => {
      setCounts(c.data || []);
    });
    activityService.getCloWeightsInSection(allocation.section!.id).then(r => {
      setCloWeights(r.data);
    });
  }, []);

  useEffect(() => {
    if (!assessments || !type) return;
    setClos(undefined);
    const clos: CLOType[] = [];
    assessments.forEach(a => {
      if (a.type.id === type!.id) clos.push(a.clo);
    });
    setClos(clos);
    setAdded(clos.map(c => undefined));
  }, [type]);

  const count = counts ? counts.find(c => c.id === type?.id!)?.count || 0 : -1;
  const marksError = parseInt(marks) <= 0;

  return cloWeights ? (
    <ScrollView>
      <Card style={{margin: 8, padding: 8}}>
        <Title>
          {type
            ? count !== -1
              ? `${type.name} ${count + 1}`
              : 'Loading...'
            : 'Select Type'}
        </Title>
        <>
          <TextInput
            mode="outlined"
            label="Total Marks"
            onChangeText={txt => {
              if (new RegExp('^[0-9]*$').test(txt)) {
                setMarks(txt);
              }
            }}
            error={marksError}
            maxLength={3}
            value={marks}
            keyboardType="decimal-pad"
          />
          {marksError && (
            <Caption style={{color: colors.red}}>
              Marks must be greater than 0!
            </Caption>
          )}
        </>
        <Caption style={{marginTop: 8}}>Choose Type</Caption>
        {types ? (
          <ListSelect
            options={[
              {name: 'Select a Type...', value: '', disabled: true},
              ...types.map(c => ({name: c.name, value: c.id})),
            ]}
            onSelect={o => setType(types.find(c => c.id === o.value)!)}
          />
        ) : (
          <ActivityIndicator />
        )}
        {clos ? (
          clos.length > 0 ? (
            <>
              <Caption style={{marginTop: 8}}>Add CLOs</Caption>
              {clos.map((c, i) => {
                const weight = getCloUsage(c.id);
                return (
                  <WeightPicker
                    title={`CLO ${c.number}`}
                    description={`${weight}% Assigned`}
                    onChange={weight => {
                      added[i] = {...c, weight};
                      setAdded([...added]);
                    }}
                    onRemove={() => {
                      added[i] = undefined;
                      setAdded([...added]);
                    }}
                    usedWeight={weight}
                  />
                );
              })}
            </>
          ) : (
            <Caption style={{color: colors.red}}>
              No CLOs Available for this course!
            </Caption>
          )
        ) : type ? (
          <ActivityIndicator />
        ) : (
          <></>
        )}
        <Button
          style={{marginTop: 16}}
          icon="check"
          mode="contained"
          disabled={!type || !added || added.length === 0 || saving}
          loading={saving}
          onPress={() => {
            setSaving(true);
            const activity = {
              title: `${type!.name!} ${count + 1}`,
              marks,
              type: {id: type!.id},
              section: {id: allocation.section!.id},
              maps: added
                .filter(c => c)
                .map(c => ({
                  clo: {id: c!.id},
                  weight: c.weight,
                })),
            };
            activityService
              .insert(activity)
              .then(r => {
                onAdd(r.data);
                uiService.toastSuccess('Added Exam successfully!');
                navigation.goBack();
              })
              .catch(e => {
                uiService.toastError('Failed to add Exam!');
              })
              .finally(() => {
                setSaving(false);
              });
          }}>
          Add
        </Button>
      </Card>
    </ScrollView>
  ) : (
    <ActivityIndicator style={{flex: 1}} />
  );
}
