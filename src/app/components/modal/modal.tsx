import React from 'react';
import ModalBase from './modal-base';
import {ModalPropType} from './modal-prop-type';

/** Shows a modal with given children when visible prop is set to true */
export default class Modal extends React.Component<ModalPropType> {
  render() {
    return <ModalBase {...this.props} animationType="fade" />;
  }
}
