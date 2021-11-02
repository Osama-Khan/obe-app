import {ManyCriteria} from '@app/models/criteria';
import uiService from '@app/services/ui.service';
import {AxiosResponse} from 'axios';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {DataTable} from '.';
import {DataTableProps} from './data-table';

type P<T> = Omit<DataTableProps<T>, 'data'> & {
  /** The method used to fetch data */
  fetchMethod: (criteria?: ManyCriteria<T>) => Promise<AxiosResponse<T[]>>;

  /** The criteria for filtering entities */
  criteria?: ManyCriteria<T>;

  /** The method used to extract data from response */
  dataExtractor?: (response: AxiosResponse<T[]>) => T[];
};

type S<T> = {
  items?: T[];
};

/** An implementation over the DataTable component that supports
 * data fetching using an axios request.
 */
export default class FetchingDataTable<ItemType> extends React.Component<
  P<ItemType>,
  S<ItemType>
> {
  state: S<ItemType> = {};

  componentDidMount() {
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
        uiService.toastError('Failed to load table data!');
      });
  }

  render() {
    const {items: data} = this.state;
    return data ? (
      <DataTable data={data} {...this.props} />
    ) : (
      <ActivityIndicator style={{flexGrow: 1}} />
    );
  }
}
