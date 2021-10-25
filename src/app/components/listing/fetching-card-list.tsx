import uiService from '@app/services/ui.service';
import {AxiosResponse} from 'axios';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {IconMessageView} from '../icon-message-view';
import CardList, {CardListProps} from './card-list';

type P<T> = Omit<CardListProps<T>, 'data'> & {
  /** The method used to fetch data */
  fetchMethod: () => Promise<AxiosResponse<T[]>>;

  /** The method used to extract data from response */
  dataExtractor?: (response: AxiosResponse<T[]>) => T[];
};

type S<T> = {
  items?: T[];
};

/** An implementation over the CardList component that supports
 * data fetching using an axios request.
 */
export default class FetchingCardList<ItemType> extends React.Component<
  P<ItemType>,
  S<ItemType>
> {
  state: S<ItemType> = {};

  componentDidMount() {
    this.props
      .fetchMethod()
      .then(res => {
        let items = res.data;
        if (this.props.dataExtractor) {
          items = this.props.dataExtractor(res);
        }
        this.setState({...this.state, items});
      })
      .catch(e => {
        uiService.toastError('Failed to load list!');
      });
  }

  render() {
    return this.state.items ? (
      <CardList
        ListEmptyComponent={() => (
          <IconMessageView
            title="No data!"
            caption="The response was empty..."
            icon="emoticon-sad"
          />
        )}
        {...this.props}
        data={this.state.items}
      />
    ) : (
      <ActivityIndicator style={{flexGrow: 1}} />
    );
  }
}
