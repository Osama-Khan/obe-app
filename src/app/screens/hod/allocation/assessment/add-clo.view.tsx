import ListSelect from '@app/components/list-select';
import assessmentService from '@app/services/assessment.service';
import uiService from '@app/services/ui.service';
import {ActivityTypeType, AssessmentType, CLOType} from '@app/types';
import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Button, Divider, TextInput, Title} from 'react-native-paper';

type P = {
  /** The activity type the CLO is being added for */
  type: ActivityTypeType;
  /** ID of the allocation the assessment is for */
  allocId: string;
  /** CLOs available */
  clos: (CLOType & {weight: number})[];
  /** Called with the assessment when an assessment is successfully added */
  onAdd: (assessment: Partial<AssessmentType>) => void;
};

export default function AddCLOView({onAdd, allocId, type, clos}: P) {
  const [weight, setWeight] = useState(25);
  const [clo, setClo] = useState(clos[0]);
  const [saving, setSaving] = useState(false);

  return (
    <ScrollView>
      <View style={{marginHorizontal: 16}}>
        <Title style={{textAlign: 'center'}}>Add CLO for {type.name}</Title>
        <Divider style={{marginVertical: 8}} />
        <TextInput
          value={weight.toString()}
          style={{
            backgroundColor: '#0000',
            margin: 4,
          }}
          label="Weight"
          keyboardType="decimal-pad"
          maxLength={3}
          onChangeText={weight => {
            if (weight === '') {
              setWeight(1);
              return;
            }
            const num = parseInt(weight);
            if (num === NaN) return;
            if (num > 100) setWeight(100);
            else setWeight(num > 0 ? num : 1);
          }}
          dense
        />
        <ListSelect
          options={clos.map(c => ({name: c.title, value: c.id}))}
          onSelect={o => setClo(clos.find(c => c.id === o.value))}
        />
      </View>
      <Button
        style={{marginTop: 16, borderRadius: 0}}
        icon="check"
        mode="contained"
        disabled={saving}
        loading={saving}
        onPress={() => {
          setSaving(true);
          const assessment = {
            allocation: {id: allocId},
            type: {id: type.id},
            weight,
            clo,
          };
          assessmentService
            .insert(assessment)
            .then(r => {
              onAdd(r.data);
            })
            .catch(e => {
              uiService.toastError('Failed to add CLO!');
            })
            .finally(() => {
              setSaving(false);
            });
        }}>
        Add
      </Button>
    </ScrollView>
  );
}
