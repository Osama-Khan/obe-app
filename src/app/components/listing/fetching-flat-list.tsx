import {ManyCriteria} from '@app/models/criteria';
import uiService from '@app/services/ui.service';
import {AxiosResponse} from 'axios';
import React from 'react';
import {FlatListProps, FlatList, RefreshControl} from 'react-native';
import {ActivityIndicator, Caption} from 'react-native-paper';
import {IconMessageView} from '../icon-message-view';

export type FetchingFlatListProps<T> = Omit<FlatListProps<T>, 'data'> & {
  /** The method used to fetch data */
  fetchMethod: (criteria?: ManyCriteria<T>) => Promise<AxiosResponse<T[]>>;

  /** The criteria for filtering entities */
  criteria?: ManyCriteria<T>;

  /** Filter for the records */
  filter?: (item: T) => boolean;

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
    const filtered = this.state.items?.filter(
      this.props.filter || (() => true),
    );
    return this.state.items ? (
      <FlatList
        ListEmptyComponent={() =>
          this.state.items!.length > 0 ? (
            <Caption style={{alignSelf: 'center', flexGrow: 1}}>
              No records found matching the given filter!
            </Caption>
          ) : (
            <IconMessageView
              title="No data!"
              caption="The response was empty..."
              icon="emoticon-sad"
            />
          )
        }
        {...this.props}
        data={filtered}
        onRefresh={this.load}
        refreshing={this.state.loading && !!this.state.items}
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
      .fetchMethod(this.props.criteria)
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
