import React from 'react';
import {ScrollView, Dimensions, View} from 'react-native';
import Icon from '../icon';
import ModalBase from './modal-base';
import {ModalPropType} from './modal-prop-type';

export default class BottomUpModal extends React.Component<ModalPropType, any> {
  render() {
    const {children, ...other} = this.props;
    return (
      <>
        <ModalBase
          visible={this.props.visible}
          animationType="fade"
          children={[]}
        />
        <ModalBase
          {...other}
          position="bottom"
          animationType="slide"
          backgroundColor="#0000"
          modalStyle={{borderTopLeftRadius: 8, borderTopRightRadius: 8}}>
          <View style={[modalStyle, {height: '40vh'}]}>
            <Icon
              name="drag-horizontal-variant"
              color={'#888'}
              size={24}
              style={{alignSelf: 'center'}}
            />
            <ScrollView>{children}</ScrollView>
          </View>
        </ModalBase>
      </>
    );
  }

  get windowHeight() {
    return Dimensions.get('window').height;
  }

  get expandedHeight() {
    return this.windowHeight * 0.9;
  }

  get collapsedHeight() {
    return this.windowHeight * 0.4;
  }

  get heightCenter() {
    return this.windowHeight * 0.6;
  }
}

const modalStyle = {
  backgroundColor: '#ddd',
};
