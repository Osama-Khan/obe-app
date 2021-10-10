import React from 'react';
import {useFormikContext} from 'formik';
import {DatePickerInput, DatePickerInputPropsType} from '.';

type P = DatePickerInputPropsType & {
  /** Key of the value property in Formik initial values prop */
  propKey: string;
};
/** Uses Formik context to integrate DatePickerInput with Formik
 * based form. Can only be used as a child of a Formik component. */
export default function DatePickerInputFormik({onPick, ...props}: P) {
  const {values, setValues}: any = useFormikContext();
  return (
    <DatePickerInput
      {...props}
      onPick={date => {
        const newValues = values;
        newValues[props.propKey] = date;
        setValues(newValues);
        if (onPick) onPick(date);
      }}
    />
  );
}
