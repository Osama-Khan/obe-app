import {colors} from '@app/styles';
import React from 'react';
import {IconProps} from 'react-native-vector-icons/Icon';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Icon(props: IconProps) {
  return <MaterialIcon {...props} color={props.color || colors.textInverted} />;
}
