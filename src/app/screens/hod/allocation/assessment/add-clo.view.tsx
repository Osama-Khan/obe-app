import ListSelect from '@app/components/list-select';
import assessmentService from '@app/services/assessment.service';
import uiService from '@app/services/ui.service';
import {colors} from '@app/styles';
import {ActivityTypeType, AssessmentType, CLOType} from '@app/types';
import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Button, Caption, Divider, TextInput, Title} from 'react-native-paper';

type P = {
  /** The activity type the CLO is being added for */
  type: ActivityTypeType;
  /** ID of the course the assessment is for */
  courseId: string;
  /** CLOs available */
  clos: (CLOType & {weight: number})[];
  /** Called with the assessment when an assessment is successfully added */
  onAdd: (assessment: Partial<AssessmentType>) => void;
};

export default function AddCLOView({onAdd, courseId, type, clos}: P) {
  const [weight, setWeight] = useState(25);
  const [clo, setClo] = useState<Partial<CLOType> & {weight: number}>(clos[0]);
  const [saving, setSaving] = useState(false);

  const weightFree = 100 - clo.weight;

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
          options={clos.map(c => ({name: `CLO ${c.number}`, value: c.id}))}
          onSelect={o => setClo(clos.find(c => c.id === o.value)!)}
        />
        <Caption style={weight <= weightFree ? {} : {color: colors.red}}>
          This CLO has {weightFree}% weight free.
        </Caption>
      </View>
      <Button
        style={{marginTop: 16, borderRadius: 0}}
        icon="check"
        mode="contained"
        disabled={weight > weightFree || saving}
        loading={saving}
        onPress={() => {
          setSaving(true);
          const assessment = {
            course: {id: courseId},
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
