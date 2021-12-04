import {ManyCriteria} from '@app/models/criteria';
import ploService from '@app/services/plo.service';
import uiService from '@app/services/ui.service';
import {colors} from '@app/styles';
import {PLOType} from '@app/types';
import {useRoute} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Caption,
  Card,
  Divider,
  TextInput,
  Title,
} from 'react-native-paper';

type FormData = Pick<PLOType, 'number' | 'title' | 'description'>;

export default function EditPLOScreen() {
  const [saving, setSaving] = useState(false);
  const route = useRoute<any>();
  const [plo, setPlo] = useState(route.params!.plo);
  const [data, setData] = useState(plo);
  const [usedNums, setUsedNums] = useState<number[]>();

  useEffect(() => {
    const crit = new ManyCriteria<PLOType>();
    crit.addSelect('number');
    ploService
      .get(crit)
      .then(r =>
        setUsedNums(r.data.map(d => d.number).filter(n => plo.number !== n)),
      );
  }, []);

  const isNumUsed = usedNums?.includes(parseInt(data.number));

  return (
    <Card style={{margin: 8, padding: 8}}>
      <Title>Update PLO</Title>
      <Caption>Make the changes and then tap save...</Caption>
      <Divider style={{marginVertical: 8}} />
      <TextInput
        style={{marginVertical: 4}}
        label="PLO Title"
        value={data.title}
        onChangeText={title => setData({...data, title})}
        mode="outlined"
      />
      <TextInput
        style={{marginVertical: 4}}
        label="PLO Description"
        multiline
        value={data.description}
        onChangeText={description => setData({...data, description})}
        mode="outlined"
      />
      <TextInput
        style={{marginVertical: 4}}
        label="PLO Number"
        value={data.number.toString()}
        onChangeText={number => setData({...data, number})}
        mode="outlined"
        error={isNumUsed}
      />
      {isNumUsed && (
        <Caption style={{color: colors.red}}>
          This number is already in use!
        </Caption>
      )}
      <Button
        icon="floppy"
        mode="contained"
        style={{marginTop: 8}}
        onPress={() => {
          setSaving(true);
          let d: Partial<FormData> = {};
          data.description && (d.description = data.description);
          data.number && (d.number = parseInt(data.number));
          data.title && (d.title = data.title);
          ploService
            .update(plo.id, d)
            .then(res => {
              uiService.toastSuccess('Successfully updated PLO!');
              setPlo({plo, ...d});
            })
            .catch(e => {
              uiService.toastError('Failed to update PLO!');
            })
            .finally(() => setSaving(false));
        }}
        disabled={
          saving ||
          hasNoChange(data, plo) ||
          !usedNums ||
          isNumUsed ||
          !data.title ||
          !data.description ||
          !data.title
        }
        loading={saving}>
        Save
      </Button>
    </Card>
  );
}

const hasNoChange = (data: FormData & {number: string}, plo: PLOType) =>
  data.title === plo.title &&
  data.description === plo.description &&
  data.number === plo.number.toString();
