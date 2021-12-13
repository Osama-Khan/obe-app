import React from 'react';
import {ModalProps, StyleProp, TextStyle, View} from 'react-native';
import {Divider, Title, Text, Button} from 'react-native-paper';
import Modal from './modal';

type ModalButtonType = {
  text?: string;
  onPress: () => void;
  style?: StyleProp<TextStyle>;
};

type ConfirmModalProps = Omit<ModalProps, 'children'> & {
  title: string;
  description: string;
  positiveButton: ModalButtonType;
  negativeButton: ModalButtonType;
};

export default function ConfirmModal(props: ConfirmModalProps) {
  const {title, description, positiveButton, negativeButton, ...others} = props;
  return (
    <Modal {...others}>
      <Title style={{fontWeight: 'bold', padding: 8}}>{title}</Title>
      <Divider />
      <Text style={{minHeight: '15%', margin: 8}}>{description}</Text>
      <Divider />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: 8,
        }}>
        <Button style={positiveButton.style} onPress={positiveButton.onPress}>
          {positiveButton.text || 'Yes'}
        </Button>
        <Button style={negativeButton.style} onPress={negativeButton.onPress}>
          {negativeButton.text || 'No'}
        </Button>
      </View>
    </Modal>
  );
}
