import {colors} from '@app/styles';
import React from 'react';
import {Alert, FlatList, FlatListProps, View} from 'react-native';
import {
  Badge,
  Caption,
  Card,
  Divider,
  IconButton,
  List,
  Text,
  Title,
} from 'react-native-paper';
import Icon from '@app/components/icon';
import {CLOType} from '@app/types';

type P = Omit<FlatListProps<CLOType>, 'data' | 'renderItem'> & {
  clos: CLOType[];
  onDelete?: (item: CLOType) => void;
  onEdit?: (item: CLOType) => void;
};
export const CLOList = ({clos, onDelete, onEdit, ...props}: P) => (
  <FlatList
    {...props}
    data={clos}
    renderItem={({item}) => (
      <Card
        style={{
          borderWidth: item.maps![0].weight > 0 ? undefined : 2,
          borderTopWidth: item.maps![0].weight === 0 ? undefined : 2,
          borderColor: colors.primary,
          margin: 16,
          marginVertical: 8,
          overflow: 'hidden',
        }}>
        <View style={{padding: 8}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Title>CLO {item.number}</Title>
            {!!onDelete && (
              <IconButton
                style={{marginLeft: 'auto'}}
                color={colors.red}
                icon="link-off"
                onPress={() => onDelete(item)}
              />
            )}
            {!!onEdit && (
              <IconButton
                style={{marginLeft: 'auto'}}
                color={colors.primary}
                icon="pencil"
                onPress={() => onEdit(item)}
              />
            )}
          </View>
          {item.maps![0].weight === 0 && (
            <Badge
              style={{
                backgroundColor: colors.primary,
                alignSelf: 'flex-start',
                position: 'absolute',
                top: 0,
                left: 0,
                margin: -2,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              onPress={() =>
                Alert.alert(
                  'Needs weights',
                  'This CLO has been mapped but needs weights from HOD to be effective.',
                )
              }>
              <Icon name="exclamation-thick" />
              Needs weights
            </Badge>
          )}
          <Caption>
            {item.title}: {item.description}
          </Caption>
        </View>
        <Divider />
        <List.Accordion title="Mapped PLOs" style={{backgroundColor: 'white'}}>
          {item.maps!.map(m => (
            <List.Item
              title={m.plo!.title}
              right={() => (
                <Text style={{textAlignVertical: 'center', fontWeight: 'bold'}}>
                  {m.weight}%
                </Text>
              )}
            />
          ))}
        </List.Accordion>
      </Card>
    )}
  />
);
