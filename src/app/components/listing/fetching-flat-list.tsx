import uiService from '@app/services/ui.service';
import {AxiosResponse} from 'axios';
import React from 'react';
import {FlatListProps, FlatList, RefreshControl} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {IconMessageView} from '../icon-message-view';

export type FetchingFlatListProps<T> = Omit<FlatListProps<T>, 'data'> & {
  /** The method used to fetch data */
  fetchMethod: () => Promise<AxiosResponse<T[]>>;

  /** The method used to extract data from response */
  dataExtractor?: (response: AxiosResponse<T[]>) => T[];
};

type S<T> = {
  items?: T[];
  loading: boolean;
};

/** An implementation over the FlatList component that supports
 * data fetching using an axios request.
 */
export default class FetchingFlatList<ItemType> extends React.Component<
  FetchingFlatListProps<ItemType>,
  S<ItemType>
> {
  state: S<ItemType> = {loading: false};

  componentDidMount() {
    this.load();
  }

  render() {
    return this.state.items ? (
      <FlatList
        ListEmptyComponent={() => (
          <IconMessageView
            title="No data!"
            caption="The response was empty..."
            icon="emoticon-sad"
          />
        )}
        {...this.props}
        data={this.state.items}
        onRefresh={this.load}
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading && !!this.state.items}
          />
        }
      />
    ) : (
      <ActivityIndicator style={{flexGrow: 1}} />
    );
  }

  load = () => {
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
  };
}
