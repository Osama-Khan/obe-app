import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import ActionIndicator from './ActionIndicator';

type P = {
  /** Action on pressing the button */
  onPress: () => void;
  /** Icon to show on button */
  icon: string;
  /** Text to show in button */
  text: string;
  /** If warning should be shown next to button */
  warning?: boolean;
  /** If button should be disabled */
  disabled?: boolean;
};

export default function CourseCardButton({
  onPress,
  icon,
  text,
  warning,
  disabled,
}: P) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Button
        icon={icon}
        style={{borderRadius: 0, flexGrow: 1}}
        onPress={onPress}
        disabled={disabled}>
        {text}
      </Button>
      {warning && <ActionIndicator />}
    </View>
  );
}
