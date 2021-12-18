import {colors} from '@app/styles';
import React, {useState} from 'react';
import {
  List,
  Caption,
  Switch,
  TextInput as PaperInput,
} from 'react-native-paper';

type P = {
  /** Label for input field */
  inputLabel?: string;

  /** Title of the Picker */
  title: string;

  /** Description of the Picker */
  description: string;

  /** Total used weight. 100 is maximum and results in disabled switch. */
  usedWeight: number;

  /** Called when weight changes in the text input */
  onChange: (weight: number) => void;

  /** Called when switch is deactivated */
  onRemove: () => void;
};

/** Component that can be used to pick weights for objectives */
export default function WeightPicker({
  onChange,
  onRemove,
  title,
  description,
  usedWeight,
  inputLabel,
}: P) {
  const [enabled, setEnabled] = useState(false);
  return (
    <>
      <List.Item
        title={title}
        description={description}
        right={() => (
          <Switch
            value={enabled}
            disabled={usedWeight === 100}
            style={{alignSelf: 'center'}}
            onValueChange={v => {
              if (v) {
                onChange(0);
              } else {
                onRemove();
              }
              setEnabled(v);
            }}
          />
        )}
      />
      {enabled ? (
        <TextInput
          onWeightChange={(weight: number) => {
            onChange(weight);
          }}
          usedWeight={usedWeight}
          label={inputLabel}
        />
      ) : (
        <></>
      )}
    </>
  );
}

type InputProps = {
  /** Label of the input field */
  label?: string;

  /** Total used weight. Input doesn't allow more than 100 for usedWeight + it's own weight */
  usedWeight: number;

  /** Called when weight input changes */
  onWeightChange: (weight: number) => void;
};

const TextInput = ({onWeightChange, usedWeight, label}: InputProps) => {
  const [weight, setWeight] = useState('0');
  const weightLeft = 100 - usedWeight;
  const overWeight = parseInt(weight) > weightLeft;
  const underWeight = parseInt(weight) < 1;
  return (
    <>
      <PaperInput
        mode="outlined"
        label={label || 'Weight'}
        defaultValue={'0'}
        value={weight}
        onChangeText={txt => {
          if (txt) {
            const num = parseInt(txt);
            if (num.toString() !== txt) {
              return;
            }
            onWeightChange(num);
          }
          setWeight(txt);
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
