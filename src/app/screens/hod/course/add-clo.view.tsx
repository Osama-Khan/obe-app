import ListSelect from '@app/components/list-select';
import cloService from '@app/services/clo.service';
import ploService from '@app/services/plo.service';
import uiService from '@app/services/ui.service';
import {colors} from '@app/styles';
import {CLOType, PLOType} from '@app/types';
import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Caption,
  Chip,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';

type P = {
  /** ID of the course the CLO is being added for */
  courseId: string;
  /** Called with the clo when a clo is successfully added */
  onAdd: (clo: Partial<CLOType>) => void;
};

export default function AddCloView({onAdd, courseId}: P) {
  const [plos, setPlos] = useState<PLOType[]>();
  const [added, setAdded] = useState<Partial<PLOType>[]>([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [saving, setSaving] = useState(false);

  const addPlo = (p: PLOType) => setAdded([...added, p]);
  const removePlo = (id: string) => setAdded(added.filter(a => a.id !== id));

  useEffect(() => {
    ploService
      .get()
      .then(r => setPlos(r.data))
      .catch(e => uiService.toastError('Could not fetch PLOs!'));
  }, []);

  return (
    <View>
      <View style={{marginHorizontal: 16, marginTop: 16}}>
        <Title>Add CLO</Title>
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
        <Title>Map PLOs</Title>
        <Caption>Tap to add PLO</Caption>
      </View>
      <FlatList
        horizontal
        data={plos}
        // Adds padding at the start and end to prevent whitespace
        // while scrolling
        ListHeaderComponent={<View style={{width: 16}} />}
        ListFooterComponent={<View style={{width: 16}} />}
        renderItem={({item: p}) => {
          const isAdded = added.find(a => p.id === a.id);
          return (
            <Chip
              icon={isAdded ? undefined : 'plus'}
              onPress={isAdded ? undefined : () => addPlo(p)}
              onClose={isAdded ? () => removePlo(p.id) : undefined}
              style={[
                {margin: 4},
                isAdded
                  ? {
                      backgroundColor: colors.primaryLight,
                      borderColor: colors.primaryDark,
                      borderWidth: 2,
                    }
                  : {},
              ]}
              key={p.id}>
              <Text>{p.title}</Text>
            </Chip>
          );
        }}
        ListEmptyComponent={<ActivityIndicator />}
      />
      <Button
        style={{marginTop: 16, borderRadius: 0}}
        icon="plus"
        mode="contained"
        disabled={!title || !desc || saving}
        loading={saving}
        onPress={() => {
          cloService
            .insert({
              title,
              description: desc,
              course: {id: courseId},
              plos: added.map(p => ({id: p.id})),
            })
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
    </View>
  );
}
