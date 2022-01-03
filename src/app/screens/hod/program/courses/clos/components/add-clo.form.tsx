import React, {useState} from 'react';
import {CLOType, CourseType, PLOType, ProgramType} from '@app/types';
import {colors} from '@app/styles';
import {View} from 'react-native';
import {TextInput, Button, Caption, Divider, Title} from 'react-native-paper';
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
  const [active, setActive] = useState<ActiveType[]>(plos.map(p => undefined));
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
      {plos.map((p, i) => (
        <WeightPicker
          title={`PLO ${p.number}`}
          description={`${p.weight}% Assigned`}
          onChange={weight => {
            active[i] = {...p, weight, usedWeight: p.weight};
            setActive([...active]);
          }}
          onRemove={() => {
            active[i] = undefined;
            setActive([...active]);
          }}
          usedWeight={p.weight}
        />
      ))}
      <Divider />
      <Button
        style={{marginVertical: 8}}
        mode="contained"
        disabled={
          !desc ||
          !title ||
          !number ||
          invalidNumber ||
          active.some(
            a =>
              a &&
              (!a.weight || a.weight <= 0 || a.weight + a.usedWeight > 100),
          )
        }
        onPress={() => {
          onAdd({
            title,
            description: desc,
            course: {id: course.id} as CourseType,
            maps: active
              .filter(a => a)
              .map(a => ({
                plo: a,
                weight: a!.weight,
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
