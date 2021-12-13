import {AppTheme} from '@app/styles';
import React from 'react';
import {
  ScrollView,
  PanResponder,
  PanResponderInstance,
  Dimensions,
  ModalProps,
} from 'react-native';
import Reanimated, {EasingNode} from 'react-native-reanimated';
import Icon from '../icon';
import ModalBase from './modal-base';

export default class BottomUpModal extends React.Component<ModalProps, any> {
  height = new Reanimated.Value(this.collapsedHeight);
  heightValue = this.collapsedHeight;
  modalHeight = this.collapsedHeight;
  _panResponder: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      const modalExpanded = this.modalHeight > this.heightCenter;
      this.modalHeight = modalExpanded
        ? this.expandedHeight
        : this.collapsedHeight;
    },
    onPanResponderMove: (_, g) => {
      const height = this.modalHeight - g.dy;
      this.heightValue = height;
      this.height.setValue(height);
    },
    onPanResponderRelease: (_, g) => {
      // Should dismiss if height too small
      if (this.heightValue < this.windowHeight * 0.2) {
        this.props.onDismiss();
        this.height.setValue(this.collapsedHeight);
        return;
      }

      if (g.dy < 0) {
        this.modalHeight = this.expandedHeight;
      } else {
        this.modalHeight = this.collapsedHeight;
      }
      Reanimated.timing(this.height, {
        toValue: this.modalHeight,
        duration: 200,
        easing: EasingNode.out(EasingNode.ease),
      }).start();
    },
  });

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
          modalStyle={{
            borderTopLeftRadius: AppTheme.roundness,
            borderTopRightRadius: AppTheme.roundness,
          }}>
          <Reanimated.View
            style={[modalStyle, {height: this.height}]}
            {...this._panResponder.panHandlers}>
            <Icon
              name="drag-horizontal-variant"
              color="#888"
              size={24}
              style={{alignSelf: 'center'}}
            />
            <ScrollView>{children}</ScrollView>
          </Reanimated.View>
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
  backgroundColor: '#fff',
};
