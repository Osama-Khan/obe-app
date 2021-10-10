import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Card, Menu, Text} from 'react-native-paper';

type OptionType = {
  name: string;
  value: string;
  key?: string;
  icon?: string;
  disabled?: boolean;
  selected?: boolean;
};
type PropType<T extends OptionType> = {
  options: T[];
  onSelect: (option: T) => void;
  style?: StyleProp<ViewStyle>;
};
type StateType<T extends OptionType> = {visible: boolean; selected: T};

export default class DropDown<T extends OptionType> extends React.Component<
  PropType<T>,
  StateType<T>
> {
  constructor(props: PropType<T>) {
    super(props);
    let selected = props.options.findIndex(o => o.selected);
    selected = selected === -1 ? 0 : selected;
    this.state = {visible: false, selected: props.options[selected]};
  }

  render() {
    return (
      <Menu
        anchor={
          <Card
            style={[cardStyle, ...[this.props.style]]}
            onPress={() => this.setState({...this.state, visible: true})}>
            <Text>{this.state.selected.name}</Text>
          </Card>
        }
        onDismiss={() => this.setState({...this.state, visible: false})}
        visible={this.state.visible}>
        {this.props.options.map((o, i) => (
          <Menu.Item
            title={o.name}
            onPress={() => {
              this.setState({visible: false, selected: o});
              this.props.onSelect(o);
            }}
            disabled={o.disabled}
            icon={o.icon}
            key={o.key || i}
          />
        ))}
      </Menu>
    );
  }
}

const cardStyle = {padding: 8, margin: 4};
