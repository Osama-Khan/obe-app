import {colors} from '@app/styles';
import React, {useState} from 'react';
import {Menu, IconButton} from 'react-native-paper';
import Icon from '@app/components/icon';

type P = {onEdit: () => void; onDelete: () => void};
export default function CourseCardMenu({onEdit, onDelete}: P) {
  const [vis, setVis] = useState(false);
  const show = () => setVis(true);
  const hide = () => setVis(false);
  return (
    <Menu
      visible={vis}
      anchor={<IconButton icon="dots-vertical" onPress={show} />}
      onDismiss={hide}>
      <Menu.Item
        title="Edit"
        icon="pencil"
        onPress={() => {
          onEdit();
          hide();
        }}
      />
      <Menu.Item
        title="Delete"
        icon={p => <Icon {...p} color={colors.red} name="delete" />}
        titleStyle={{color: colors.red}}
        onPress={() => {
          onDelete();
          hide();
        }}
      />
    </Menu>
  );
}
