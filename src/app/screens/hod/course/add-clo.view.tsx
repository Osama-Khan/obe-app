import cloService from '@app/services/clo.service';
import uiService from '@app/services/ui.service';
import {colors} from '@app/styles';
import {CLOType, PLOType} from '@app/types';
import ObjectiveMapType from '@app/types/objective-map.type';
import React, {useState} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Chip,
  Divider,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';

type P = {
  /** ID of the course the CLO is being added for */
  courseId: string;
  /** PLOs available for the course */
  plos: (PLOType & {weight: number})[];
  /** Called with the clo when a clo is successfully added */
  onAdd: (clo: Partial<CLOType>) => void;
};

export default function AddCloView({onAdd, courseId, plos}: P) {
  const [added, setAdded] = useState<
    Pick<ObjectiveMapType, 'plo' | 'weight'>[]
  >([]);
  const [title, setTitle] = useState('');
  const [weight, setWeight] = useState(25);
  const [desc, setDesc] = useState('');
  const [saving, setSaving] = useState(false);

  const addPlo = (plo: PLOType & {weight: number}, weight: number) => {
    if (weight <= 0) {
      uiService.toastError(`Weight can't be 0`);
      return;
    }
    if (weight > 100 || weight + plo.weight > 100) {
      const possibleWeight = 100 - plo.weight;
      uiService.toastError(
        `Max possible weight is ${possibleWeight}%`,
        'Too much weight!',
      );
      return;
    }
    setAdded([...added, {plo, weight}]);
  };
  const removePlo = (id: string) =>
    setAdded(added.filter(a => a.plo?.id !== id));

  return (
    <ScrollView>
      <View style={{marginHorizontal: 16}}>
        <Title style={{textAlign: 'center'}}>Add CLO</Title>
        <TextInput
          mode="outlined"
          label="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          mode="outlined"
          label="Description"
          value={desc}
          onChangeText={setDesc}
        />
        <Divider style={{marginVertical: 8}} />
        <Title>PLO Mapping</Title>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>Tap to add PLO with</Text>
          <TextInput
            value={weight.toString()}
            style={{
              backgroundColor: '#0000',
              margin: 4,
            }}
            keyboardType="decimal-pad"
            onChangeText={weight => {
              if (weight === '') {
                setWeight(1);
                return;
              }
              const num = parseInt(weight);
              if (num === NaN) return;
              setWeight(num > 0 ? num : 1);
            }}
            dense
          />
          <Text>% weight</Text>
        </View>
      </View>
      <FlatList
        horizontal
        data={plos}
        // Adds padding at the start and end to prevent whitespace
        // while scrolling
        ListHeaderComponent={<View style={{width: 16}} />}
        ListFooterComponent={<View style={{width: 16}} />}
        renderItem={({item: p}) => {
          const isAdded = added.find(a => p.id === a.plo?.id);
          return (
            <Chip
              icon={isAdded || p.weight >= 100 ? undefined : 'plus'}
              onPress={isAdded ? undefined : () => addPlo(p, weight)}
              onClose={isAdded ? () => removePlo(p.id) : undefined}
              disabled={p.weight >= 100}
              style={[
                {margin: 4},
                isAdded
                  ? {
                      backgroundColor: colors.primaryLight,
                      borderColor: colors.primaryDark,
                      borderWidth: 2,
                    }
                  : {},
                p.weight >= 100 ? {opacity: 0.5} : {},
              ]}
              key={p.id}>
              <Text>
                {p.title} - {p.weight + (isAdded ? isAdded.weight : 0)}%
              </Text>
            </Chip>
          );
        }}
        ListEmptyComponent={<ActivityIndicator />}
      />
      <Button
        style={{marginTop: 16, borderRadius: 0}}
        icon="check"
        mode="contained"
        disabled={!title || !desc || saving}
        loading={saving}
        onPress={() => {
          setSaving(true);
          const clo = {
            title,
            description: desc,
            course: {id: courseId},
            maps: added.map(m => ({plo: {id: m.plo!.id}, weight: m.weight})),
          };
          cloService
            .insert(clo)
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
