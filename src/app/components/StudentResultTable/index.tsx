import userService from '@app/services/user.service';
import {colors} from '@app/styles';
import {ObjectiveMapType} from '@app/types';
import React from 'react';
import {Text} from 'react-native-paper';
import Icon from '@app/components/icon';
import {FetchingDataTable} from '@app/components/data-table';
import {DataTableProps} from '../data-table/data-table';

/** Renders result table for given student ID */
export default function StudentResultTable({
  id,
  ...props
}: {id?: string} & Omit<
  DataTableProps<any>,
  'fetchMethod' | 'columns' | 'rowStyle'
>) {
  if (!id) return <></>;
  return (
    <FetchingDataTable
      {...props}
      fetchMethod={() => userService.getResults(id)}
      columns={[
        {
          title: 'PLO',
          selector: ({item}: any) => <Text>PLO {item.plo.number}</Text>,
        },
        {
          title: 'Evaluated',
          selector: ({item}: any) => <Text>{item.evaluated.toFixed(2)}%</Text>,
        },
        {
          title: 'Achieved',
          selector: ({item}: any) => <Text>{item.achieved.toFixed(2)}%</Text>,
        },
        {
          title: 'Passing',
          selector: ({item}: any) => <Text>{item.plo.passing}%</Text>,
        },
        {
          title: '',
          numeric: true,
          weight: 0.2,
          selector: ({item}: any) => {
            const passed = isPassed(item);
            return (
              <Icon
                name={
                  passed === true
                    ? 'check-circle'
                    : passed === false
                    ? 'close-circle'
                    : 'dots-horizontal-circle'
                }
                color={
                  passed === true
                    ? colors.green
                    : passed === false
                    ? colors.red
                    : colors.slateDark
                }
                size={16}
              />
            );
          },
        },
      ]}
      rowStyle={(item: any) => {
        const passed = isPassed(item);
        return passed === false
          ? {
              backgroundColor: colors.redSubtle,
              borderLeftColor: colors.red,
              borderLeftWidth: 2,
            }
          : passed
          ? {
              backgroundColor: colors.greenSubtle,
              borderLeftColor: colors.green,
              borderLeftWidth: 2,
            }
          : {};
      }}
    />
  );
}

const isPassed = (
  item: ObjectiveMapType & {achieved: number; evaluated: number},
) => {
  const {achieved, evaluated} = item;
  const passing = item.plo!.passing!;
  const maxAchievable = 100 - evaluated;
  if (achieved < passing) {
    if (maxAchievable + achieved < passing) return false;
    return undefined;
  }
  return true;
};
