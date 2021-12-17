import React, {useState} from 'react';
import {CLOType, CourseType, PLOType} from '@app/types';
import {colors} from '@app/styles';
import {View} from 'react-native';
import {
  TextInput,
  Switch,
  Button,
  Caption,
  Divider,
  Title,
  List,
} from 'react-native-paper';
import {ParamsType, PLOWeightedType} from '../add-clo.screen';

type ActiveType =
  | (PLOType & {weight: string; usedWeight: number; number: number})
  | undefined;

export default function AddCLOForm({
  onAdd,
  course,
  clos,
  plos,
}: Pick<ParamsType, 'onAdd'> & {
  course: CourseType;
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
        <>
          <List.Item
            title={`PLO ${p.number}`}
            description={`${p.weight}% Assigned`}
            right={() => (
              <Switch
                value={!!active.find(a => a?.id === p.id)}
                disabled={p.weight === 100}
                style={{alignSelf: 'center'}}
                onValueChange={v => {
                  if (v) {
                    active[i] = {...p, weight: '0', usedWeight: p.weight};
                  } else {
                    active[i] = undefined;
                  }
                  setActive([...active]);
                }}
              />
            )}
          />
          {active[i] ? (
            <CLOInput active={active} setActive={setActive} i={i} />
          ) : (
            <></>
          )}
        </>
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
              (!a.weight ||
                parseInt(a.weight) <= 0 ||
                parseInt(a.weight) + a.usedWeight > 100),
          )
        }
        onPress={() => {
          onAdd({
            title,
            description: desc,
            course: {id: course.id} as CourseType,
            maps: active
              .filter(a => a)
              .map(a => ({plo: a, weight: parseInt(a!.weight)})),
            number: parseInt(number),
          });
        }}>
        Save
      </Button>
    </View>
  );
}

const CLOInput = ({active, i, setActive}: any) => {
  const current = active[i];
  const weightLeft = 100 - current.usedWeight;
  const overWeight = parseInt(current.weight) > weightLeft;
  const underWeight = parseInt(current.weight) < 1;
  return (
    <>
      <TextInput
        mode="outlined"
        label={`PLO ${current.number}`}
        defaultValue={'0'}
        value={current.weight}
        onChangeText={txt => {
          if (txt) {
            const num = parseInt(txt);
            if (num.toString() !== txt) {
              return;
            }
          }
          active[i] = {...current, weight: txt};
          setActive([...active]);
        }}
        error={overWeight || underWeight}
      />
      {overWeight && (
        <Caption style={{color: colors.red}}>
          Max weight assignable is {weightLeft}%
        </Caption>
      )}
      {underWeight && (
        <Caption style={{color: colors.red}}>
          Weight must be from 1 to {weightLeft}
        </Caption>
      )}
    </>
  );
};
