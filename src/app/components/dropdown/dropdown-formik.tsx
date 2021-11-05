import React from 'react';
import {useFormikContext} from 'formik';
import {default as Dropdown, DropdownProps} from './dropdown';
import {OptionType} from './dropdown';

type P<T extends OptionType> = Omit<DropdownProps<T>, 'onSelect'> & {
  onSelect?: (option: T) => void;
  /** Key of the value property in Formik initial values prop */
  propKey: string;
};
/** Uses Formik context to integrate DatePickerInput with Formik
 * based form. Can only be used as a child of a Formik component. */
export default function DropdownFormik<T extends OptionType>({
  onSelect,
  ...props
}: P<T>) {
  const {values, setValues}: any = useFormikContext();
  return (
    <Dropdown
      {...props}
      onSelect={option => {
        const newValues = values;
        newValues[props.propKey] = option.value;
        setValues(newValues);
        if (onSelect) onSelect(option);
      }}
    />
  );
}
