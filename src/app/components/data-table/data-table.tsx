import * as React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Checkbox, DataTable as PaperDataTable} from 'react-native-paper';
import {ActivityIndicator} from 'react-native-paper';

const DEFAULT_ITEMS_PER_PAGE = 10;

export type DataTableProps<T> = {
  /** Rows to show */
  data: T[];

  /** Property that allows checking and unchecking rows of the datatable.
   * Checkboxes are not shown if this property is not set.
   */
  checkProperty?: keyof T;

  /** Called when the checked items list changes */
  onCheckedChange?: (checkedList: T[]) => void;

  /** Columns for the datatable */
  columns: {
    /** Title shown on the header of the table */
    title: string;

    /** Property or selector used to modify the data shown */
    property: keyof T | (({item}: {item: T}) => React.ReactElement);

    /** If the column contains numeric data */
    numeric?: boolean;
  }[];

  /** Filter method for rows */
  filter?: (item: T) => boolean;

  /** Items to show per page of DataTable */
  itemsPerPage?: number;

  /** Style for the header */
  headerStyle?: StyleProp<ViewStyle>;

  /** Style for the rows */
  rowStyle?: StyleProp<ViewStyle>;

  /** Style for the footer or pagination */
  footerStyle?: StyleProp<ViewStyle>;
};

type S<T> = {page: number; checked: T[]};

/** An abstracted component based on the react-native-paper DataTable */
export default class DataTable<ItemType> extends React.Component<
  DataTableProps<ItemType>,
  S<ItemType>
> {
  state: S<ItemType> = {checked: [], page: 0};

  render() {
    const {data, checkProperty, onCheckedChange, columns, filter} = this.props;
    const {page, checked} = this.state;

    const itemsPerPage = this.props.itemsPerPage || DEFAULT_ITEMS_PER_PAGE;

    const start = page * itemsPerPage;
    let items: ItemType[] | undefined;
    let filteredItems: ItemType[] | undefined;

    if (data) {
      filteredItems = filter ? data.filter(filter) : data;
      items = filteredItems.slice(start, start + itemsPerPage);
    }

    return (
      <PaperDataTable>
        <PaperDataTable.Header>
          {checkProperty ? (
            <PaperDataTable.Title>
              <Checkbox
                status={
                  filteredItems
                    ? checked.length === filteredItems.length
                      ? 'checked'
                      : 'unchecked'
                    : 'indeterminate'
                }
                onPress={() => {
                  if (!filteredItems) return;
                  const allChecked = checked.length === filteredItems.length;
                  if (!allChecked) {
                    this.setChecked(filteredItems);
                    if (onCheckedChange) onCheckedChange(filteredItems);
                  } else {
                    this.setChecked([]);
                    if (onCheckedChange) onCheckedChange([]);
                  }
                }}
              />
            </PaperDataTable.Title>
          ) : (
            <></>
          )}
          {columns.map((c, i) => (
            <PaperDataTable.Title
              style={this.props.headerStyle}
              key={i}
              numeric={c.numeric}>
              {c.title}
            </PaperDataTable.Title>
          ))}
        </PaperDataTable.Header>

        {items ? (
          items.map((item, index) => (
            <PaperDataTable.Row key={index} style={this.props.rowStyle}>
              {checkProperty ? (
                <PaperDataTable.Cell>
                  <Checkbox
                    status={
                      checked.find(
                        c => item[checkProperty] === c[checkProperty],
                      )
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => {
                      let newChecked = [];
                      if (
                        checked.find(
                          c => item[checkProperty] === c[checkProperty],
                        )
                      ) {
                        newChecked = checked.filter(
                          c => c[checkProperty] !== item[checkProperty],
                        );
                      } else {
                        newChecked = [...checked, item];
                      }
                      this.setChecked(newChecked);
                      if (onCheckedChange) onCheckedChange(newChecked);
                    }}
                  />
                </PaperDataTable.Cell>
              ) : (
                <></>
              )}
              {columns.map(c => (
                <PaperDataTable.Cell numeric={c.numeric}>
                  {typeof c.property === 'function' ? (
                    <c.property item={item} />
                  ) : (
                    item[c.property]
                  )}
                </PaperDataTable.Cell>
              ))}
            </PaperDataTable.Row>
          ))
        ) : (
          <ActivityIndicator />
        )}

        <PaperDataTable.Pagination
          style={this.props.footerStyle}
          page={page}
          numberOfPages={
            filteredItems ? Math.ceil(filteredItems.length / itemsPerPage) : 0
          }
          onPageChange={page => this.setPage(page)}
          label={
            filteredItems
              ? `Total: ${filteredItems.length} \t ${page + 1}/${Math.ceil(
                  filteredItems.length / itemsPerPage,
                )}`
              : 'Loading...'
          }
        />
      </PaperDataTable>
    );
  }

  setChecked = (checked: any[]) => this.setState({...this.state, checked});

  setPage = (page: number) => this.setState({...this.state, page});
}
