import React from 'react';
import {View} from 'react-native';
import {Button, Caption, Title} from 'react-native-paper';
import Icon from '../icon';

type ButtonProps = {text: string; icon: string; action: () => void};
type PropType = {
  /** Icon that relates to the context */
  icon: string;

  /** A brief title for the message */
  title: string;

  /** Caption with a bit of detail of the context */
  caption: string;

  /** Options to add a button */
  btnProps?: ButtonProps;
};

/** Component that shows a message with icon and action button */
export default class IconMessageView extends React.Component<PropType> {
  render() {
    return (
      <View
        style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Icon name={this.props.icon} size={64} color="gray" />
        <Title>{this.props.title}</Title>
        <Caption>{this.props.caption}</Caption>
        {this.props.btnProps ? (
          <Button
            style={{marginVertical: 8}}
            mode="contained"
            icon={this.props.btnProps.icon}
            onPress={this.props.btnProps.action}>
            {this.props.btnProps.text}
          </Button>
        ) : (
          <></>
        )}
      </View>
    );
  }
}
