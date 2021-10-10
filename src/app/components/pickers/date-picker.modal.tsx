import React, {useState} from 'react';
import Picker from '@react-native-community/datetimepicker';

export type DatePickerPropsType = {
  visible: boolean;
  startingDate?: Date;
  maxDate?: Date;
  minDate?: Date;
  onPick: (date: Date) => void;
  onDismiss: () => void;
  onDateChange?: (date: Date) => void;
};

export default function DatePicker(props: DatePickerPropsType) {
  const [date, setDate] = useState(props.startingDate || new Date());
  return props.visible ? (
    <Picker
      value={date}
      maximumDate={props.maxDate}
      minimumDate={props.minDate}
      onChange={({nativeEvent, type}: any) => {
        if (type === 'dismissed') {
          props.onDismiss();
          return;
        }
        const date = nativeEvent?.timestamp;
        props.onPick(date);
        setDate(date);
      }}
    />
  ) : (
    <></>
  );
}
