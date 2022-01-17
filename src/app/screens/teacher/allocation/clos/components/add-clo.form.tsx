import React, {useState} from 'react';
import {CLOType, CourseType, PLOType, ProgramType} from '@app/types';
import {colors} from '@app/styles';
import {View} from 'react-native';
import {
  TextInput,
  Button,
  Caption,
  Divider,
  Title,
  List,
  Switch,
} from 'react-native-paper';
import {ParamsType, PLOWeightedType} from '../add-clo.screen';
import WeightPicker from '@app/components/WeightPicker';

type ActiveType =
  | (PLOType & {weight: number; usedWeight: number; number: number})
  | undefined;

export default function AddCLOForm({
  onAdd,
  course,
  program,
  clos,
  plos,
}: Pick<ParamsType, 'onAdd'> & {
  course: CourseType;
  program: ProgramType;
  clos: CLOType[];
  plos: PLOWeightedType[];
}) {
  const [number, setNumber] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [active, setActive] = useState<string[]>();
  const invalidNumber = !!clos.find(c => c.number === parseInt(number));
  return (
    <View>
      <TextInput
        label="Number"
        mode="outlined"
        style={{marginVertical: 4}}
        value={number}
        onChangeText={txt => {
          if (txt === '') setNumber(txt);
          else if (parseInt(txt).toString() === txt) {
            setNumber(txt);
          }
        }}
        error={invalidNumber}
      />
      {invalidNumber ? (
        <Caption style={{color: colors.red}}>
          This number has already been used with another CLO!
        </Caption>
      ) : (
        <></>
      )}
      <TextInput
        label="Title"
        mode="outlined"
        style={{marginVertical: 4}}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        label="Description"
        mode="outlined"
        style={{marginVertical: 4}}
        value={desc}
        onChangeText={setDesc}
      />
      <Divider />
      <Title>PLOs</Title>
      {plos.map(p => {
        return (
          <>
            <List.Item
              title={`PLO ${p.number}`}
              description={`${p.weight}% Assigned`}
              right={() => (
                <Switch
                  value={!!active?.find(a => a === p.id)}
                  disabled={p.weight === 100}
                  style={{alignSelf: 'center'}}
                  onValueChange={() => {
                    if (active?.find(a => a === p.id)) {
                      setActive(active?.filter(a => a !== p.id));
                    } else {
                      setActive([...(active || []), p.id]);
                    }
                  }}
                />
              )}
            />
          </>
        );
      })}
      <Divider />
      <Button
        style={{marginVertical: 8}}
        mode="contained"
        disabled={
          !desc ||
          !title ||
          !number ||
          invalidNumber ||
          !active ||
          active.length === 0
        }
        onPress={() => {
          onAdd({
            title,
            description: desc,
            course: {id: course.id} as CourseType,
            maps: active!.map(a => ({
              plo: {id: a},
              weight: 0,
              program: {id: program.id},
            })),
            number: parseInt(number),
          });
        }}>
        Save
      </Button>
    </View>
  );
}
