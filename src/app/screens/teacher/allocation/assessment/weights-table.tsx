import {colors} from '@app/styles';
import React from 'react';
import {Card, DataTable} from 'react-native-paper';
import {WeightComponentPropType} from './types';

export default function WeightsTable({
  assessments,
  types,
  clos,
  ...props
}: WeightComponentPropType) {
  const getWeight = (cloId: string, typeId: string) =>
    assessments.find(a => a.clo.id === cloId && a.type.id === typeId)?.weight;

  return (
    <Card {...props}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{flexGrow: 1.2}}>CLOs</DataTable.Title>
          {types.map(t => (
            <DataTable.Title style={{justifyContent: 'center'}}>
              {t.name[0]}
            </DataTable.Title>
          ))}
          <DataTable.Title
            style={{flexGrow: 1.2, justifyContent: 'center'}}
            numeric>
            Total
          </DataTable.Title>
        </DataTable.Header>
        {clos.map(c => {
          let rowSum = 0;
          return (
            <DataTable.Row>
              <DataTable.Cell style={{flexGrow: 1.2}}>
                CLO {c.number}
              </DataTable.Cell>
              {types.map(t => {
                const weight = getWeight(c.id, t.id);
                rowSum += weight || 0;
                return (
                  <DataTable.Cell
                    disabled={!weight}
                    style={{
                      backgroundColor: weight
                        ? colors.primarySubtle
                        : undefined,
                      margin: 2,
                      justifyContent: 'center',
                      borderRadius: 8,
                    }}>
                    {weight ? weight + '%' : '   —   '}
                  </DataTable.Cell>
                );
              })}
              <DataTable.Cell
                style={{
                  flexGrow: 1.2,
                  margin: 2,
                  justifyContent: 'center',
                  borderRadius: 8,
                  backgroundColor:
                    rowSum === 100 ? colors.greenSubtle : undefined,
                }}>
                {rowSum}%
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </Card>
  );
}
