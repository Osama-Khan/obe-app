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
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Caption,
  Card,
  TextInput,
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

export default function AddActivityScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<Partial<ActivityTypeType>>();
  const [clos, setClos] = useState<CLOType[]>();
  const [cloWeights, setCloWeights] =
    useState<{id: string; weight: number}[]>();
  const [saving, setSaving] = useState(false);

  const route = useRoute<{params: ParamsType; key: string; name: string}>();
  const {allocation, onAdd} = route.params;

  const {assessments, types} = useAssessments(allocation.id);
  const [added, setAdded] = useState<any>(clos?.map(c => undefined));

  const getCloUsage = (id: string) => {
    return cloWeights?.find(c => c.id === id)?.weight || 0;
  };

  useEffect(() => {
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
  }, [type]);

  return cloWeights ? (
    <ScrollView>
      <Card style={{margin: 8, padding: 8}}>
        <TextInput
          value={title}
          style={{marginVertical: 4}}
          mode="outlined"
          label="Title"
          onChangeText={setTitle}
          dense
        />
        <TextInput
          value={description}
          style={{marginVertical: 4}}
          mode="outlined"
          label="Description"
          onChangeText={setDescription}
          dense
        />
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
          disabled={
            !title ||
            !description ||
            !type ||
            !added ||
            added.length === 0 ||
            saving
          }
          loading={saving}
          onPress={() => {
            setSaving(true);
            const activity = {
              title,
              description,
              type: {id: type!.id},
              section: {id: allocation.section!.id},
              maps: added.map(c => ({
                clo: {id: c!.id},
                weight: c.weight,
              })),
            };
            activityService
              .insert(activity)
              .then(r => {
                onAdd(r.data);
              })
              .catch(e => {
                uiService.toastError('Failed to add Activity!');
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
