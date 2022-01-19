import React from 'react';
import {View} from 'react-native';
import Icon from '@app/components/icon';
import {colors} from '@app/styles';

/** Indicates that an action is required */
export default function ActionIndicator() {
  return (
    <View
      style={{
        backgroundColor: colors.primarySubtle,
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        height: '100%',
      }}>
      <Icon name="exclamation" color={colors.primary} size={32} />
    </View>
  );
}
