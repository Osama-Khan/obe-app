import userService from '@app/services/user.service';
import {colors} from '@app/styles';
import {ResultType} from '@app/types';
import React from 'react';
import {Text} from 'react-native-paper';
import Icon from '@app/components/icon';
import {FetchingDataTable} from '@app/components/data-table';
import {DataTableProps} from '../data-table/data-table';
import {evaluationDetailRoute} from '@app/routes/shared.routes';
import {useNavigation} from '@react-navigation/native';

type P = {id?: string} & Omit<
  DataTableProps<ResultType>,
  'data' | 'fetchMethod' | 'columns' | 'rowStyle'
>;

/** Renders result table for given student ID */
export default function StudentResultTable({id, ...props}: P) {
  if (!id) return <></>;
  const navigation = useNavigation<any>();
  return (
    <FetchingDataTable
      {...props}
      fetchMethod={() => userService.getResults(id)}
      rowOnPress={({plo, achieved, evaluated}) => {
        navigation.navigate(evaluationDetailRoute.name, {
          plo,
          achieved,
          evaluated,
          userId: id,
        });
      }}
      columns={[
        {
          title: 'PLO #',
          selector: ({item}: any) => <Text>PLO {item.plo.number}</Text>,
          weight: 0.2,
        },
        {
          title: 'Description',
          selector: ({item}: any) => <Text>{item.plo.title}</Text>,
          weight: 0.6,
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
      rowStyle={item => {
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

const isPassed = (item: ResultType) => {
  const {achieved, evaluated} = item;
  const passing = item.plo!.passing!;
  const maxAchievable = 100 - evaluated;
  if (achieved < passing) {
    if (maxAchievable + achieved < passing) return false;
    return undefined;
  }
  return true;
};
