import React, {useState} from 'react';
import {View} from 'react-native';
import {Caption, TextInput} from 'react-native-paper';
import {validateMarks} from './helpers';

type MarksInputProps = {
  marks: string;
  onChangeMarks: (marks: string) => void;
  totalMarks: number;
};

export const MarksInput = ({
  marks,
  onChangeMarks,
  totalMarks,
}: MarksInputProps) => {
  const [touched, setTouched] = useState(false);
  const error = touched && validateMarks(marks, totalMarks);
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TextInput
        mode="outlined"
        maxLength={totalMarks < 10 ? 1 : totalMarks < 100 ? 2 : 3}
        keyboardType="numeric"
        style={{width: 48}}
        value={marks}
        onChangeText={
          touched
            ? onChangeMarks
            : t => {
                setTouched(true);
                onChangeMarks(t);
              }
        }
        error={!!error}
        dense
      />
      <Caption style={{marginLeft: 8}}>/{totalMarks}</Caption>
    </View>
  );
};
