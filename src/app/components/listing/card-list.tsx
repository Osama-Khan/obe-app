import React from 'react';
import {FlatListProps, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {ActivityIndicator, Card, IconButton, List} from 'react-native-paper';

export type CardListProps<T> = Omit<FlatListProps<T>, 'renderItem'> & {
  /** The data to be listed */
  data?: T[];

  /** The title of the card */
  title: (item: T) => string;

  /** Description of the card */
  description: (item: T) => string;

  /** Component to show on the left side of a card */
  left?: (item: T) => React.ReactNode;

  /** Component to show on the right side of a card.
   * Replaces the default edit and delete options.
   */
  right?: (item: T) => React.ReactNode;

  /** Method called when edit icon is pressed.
   * Does not work if right prop is present.
   */
  handleEdit?: () => void;

  /** Method called when delete icon is pressed
   * Does not work if right prop is present.
   */
  handleDelete?: () => void;
};

/** Generic card listing component built over FlatList
 * @template ItemType Type of the items in data
 */
export default class CardList<ItemType> extends React.Component<
  CardListProps<ItemType>
> {
  render() {
    const {data, ...otherProps} = this.props;
    return (
      <FlatList
        data={data}
        renderItem={info => (
          <Card style={{margin: 4}}>
            <List.Item
              key={info.item.id || info.index}
              title={this.props.title(info.item)}
              right={() =>
                this.props.right ? (
                  this.props.right(info.item)
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    {this.props.handleEdit ? (
                      <IconButton
                        icon="pencil"
                        color="#07f"
                        onPress={this.props.handleEdit}
                      />
                    ) : (
                      <></>
                    )}
                    {this.props.handleDelete ? (
                      <IconButton
                        icon="delete"
                        color="#f22"
                        onPress={this.props.handleDelete}
                      />
                    ) : (
                      <></>
                    )}
                  </View>
                )
              }
              left={
                this.props.left ? () => this.props.left!(info.item) : undefined
              }
              description={this.props.description(info.item)}
            />
          </Card>
        )}
        ListEmptyComponent={() => <ActivityIndicator />}
        {...otherProps}
      />
    );
  }
}
