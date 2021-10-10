import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import {DatePicker, DatePickerPropsType} from '.';

export type DatePickerInputPropsType = Partial<
  Omit<TextInputProps, 'editable'>
> & {
  /** Props for the date picker modal */
  datePickerProps?: Omit<
    DatePickerPropsType,
    'onDismiss' | 'visible' | 'onPick'
  >;
  /** Called when a date is picked through DatePickerModal */
  onPick?: (date: Date) => void;
};

/** Provides a pressable TextInput based DatePicker */
export default function DatePickerInput({
  onPick,
  datePickerProps,
  ...props
}: DatePickerInputPropsType) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState('');
  return (
    <>
      <TouchableOpacity onPress={() => setShow(true)}>
        <TextInput value={date} {...props} editable={false} />
      </TouchableOpacity>
      <DatePicker
        {...datePickerProps}
        onDismiss={() => setShow(false)}
        onPick={date => {
          const dateOfBirth = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
          if (onPick) onPick(date);
          setDate(dateOfBirth);
          setShow(false);
        }}
        visible={show}
      />
    </>
  );
}
