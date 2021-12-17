import ListSelect from '@app/components/list-select';
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
import React, {useEffect, useMemo, useState} from 'react';
import {View, ScrollView, FlatList, BackHandler} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Caption,
  Card,
  Chip,
  Divider,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';

type ParamsType = {
  /** The allocation the activity is for */
  allocation: AllocationType;
  /** The clos available for the activity */
  clos: (CLOType & {weight: number})[];
  /** Called with the activity when an activity is added */
  onAdd: (activity: Partial<ActivityType>) => void;
};

export default function AddActivityScreen() {
  const [weight, setWeight] = useState(25);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [types, setTypes] = useState<ActivityTypeType[]>();
  const [type, setType] = useState<Partial<ActivityTypeType>>();
  const [added, setAdded] = useState<(Partial<CLOType> & {weight: number})[]>(
    [],
  );
  const [saving, setSaving] = useState(false);

  const route = useRoute<{params: ParamsType; key: string; name: string}>();
  const {allocation, clos, onAdd} = route.params;

  const addClo = (clo: CLOType & {weight: number}, weight: number) => {
    if (weight <= 0) {
      uiService.toastError(`Weight can't be 0`);
      return;
    }
    if (weight > 100 || weight + clo.weight > 100) {
      const possibleWeight = 100 - clo.weight;
      uiService.toastError(
        `Max possible weight is ${possibleWeight}%`,
        'Too much weight!',
      );
      return;
    }
    setAdded([...added, {...clo, weight}]);
  };
  const removeClo = (id: string) => setAdded(added.filter(a => a?.id !== id));

  useEffect(() => {
    activityService
      .getTypes()
      .then(r => {
        setTypes(r.data);
        setType(r.data[0]);
      })
      .catch(e => uiService.toastError('Could not fetch Activity types!'));
  }, []);

  return (
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
            options={types.map(c => ({name: c.name, value: c.id}))}
            onSelect={o => setType(types.find(c => c.id === o.value)!)}
          />
        ) : (
          <ActivityIndicator />
        )}
        {clos.length > 0 ? (
          <>
            <Caption style={{marginTop: 8}}>Add CLOs</Caption>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>Tap to add CLO with</Text>
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
            <FlatList
              horizontal
              data={clos}
              // Adds padding at the start and end to prevent whitespace
              // while scrolling
              ListHeaderComponent={<View style={{width: 16}} />}
              ListFooterComponent={<View style={{width: 16}} />}
              style={{marginHorizontal: -16}}
              renderItem={({item: c}) => {
                const isAdded = added.find(a => c.id === a?.id);
                return (
                  <Chip
                    icon={isAdded || c.weight >= 100 ? undefined : 'plus'}
                    onPress={isAdded ? undefined : () => addClo(c, weight)}
                    onClose={isAdded ? () => removeClo(c.id) : undefined}
                    disabled={c.weight >= 100}
                    style={[
                      {margin: 4},
                      isAdded
                        ? {
                            backgroundColor: colors.primaryLight,
                            borderColor: colors.primaryDark,
                            borderWidth: 2,
                          }
                        : {},
                      c.weight >= 100 ? {opacity: 0.5} : {},
                    ]}
                    key={c.id}>
                    <Text>
                      {c.title} - {c.weight + (isAdded ? isAdded.weight : 0)}%
                    </Text>
                  </Chip>
                );
              }}
              ListEmptyComponent={<ActivityIndicator />}
            />
          </>
        ) : (
          <Caption style={{color: colors.red}}>
            No CLOs Available for this course!
          </Caption>
        )}
        <Button
          style={{marginTop: 16}}
          icon="check"
          mode="contained"
          disabled={
            !title || !description || !type || added.length === 0 || saving
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
  );
}
