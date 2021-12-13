import React from 'react';
import {ModalProps} from 'react-native';
import ModalBase from './modal-base';

/** Shows a modal with given children when visible prop is set to true */
export default class Modal extends React.Component<ModalProps> {
  render() {
    return <ModalBase {...this.props} animationType="fade" />;
  }
}
