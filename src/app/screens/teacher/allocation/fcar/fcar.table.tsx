import {colors} from '@app/styles';
import {ActivityType} from '@app/types';
import React from 'react';
import {DataTable} from 'react-native-paper';

type P = {activities: ActivityType[]};

const gradesCrit = [0.8, 0.65, 0.5, 0.4];
const nameColWeight = 2;

export default function FCARTable({activities}: P) {
  // Total Grades [A,B,C,D]
  const totals = [0, 0, 0, 0];
  let totalAvg = 0;
  const has = activities.length > 0;

  return (
    <DataTable>
      <DataTable.Header style={{backgroundColor: colors.primarySubtle}}>
        <DataTable.Title style={{flexGrow: nameColWeight}}>
          Name
        </DataTable.Title>
        <DataTable.Title>A</DataTable.Title>
        <DataTable.Title>B</DataTable.Title>
        <DataTable.Title>C</DataTable.Title>
        <DataTable.Title>D</DataTable.Title>
        <DataTable.Title>AVG</DataTable.Title>
      </DataTable.Header>
      {has ? (
        activities.map(a => {
          const evalsAboveF = a.evaluations!.filter(
            e => e.marks >= a.marks * 0.4,
          );
          const grades = gradesCrit.map((c, i) => {
            const total = evalsAboveF.filter(
              e =>
                e.marks >= a.marks * c &&
                (i === 0 || e.marks < a.marks * gradesCrit[i - 1]),
            ).length;
            const weight = 4 - i;
            totals[i] += total;
            return {total, weight};
          });
          const avg = (
            grades.map(g => g.total * g.weight).reduce((a, b) => a + b) /
            evalsAboveF.length
          ).toFixed(2);
          totalAvg += parseFloat(avg);
          return (
            <DataTable.Row>
              <DataTable.Title style={{flexGrow: nameColWeight}}>
                {a.title}
              </DataTable.Title>
              {grades.map(g => (
                <DataTable.Cell>{g.total || '—'}</DataTable.Cell>
              ))}
              <DataTable.Cell>{parseFloat(avg) || '—'}</DataTable.Cell>
            </DataTable.Row>
          );
        })
      ) : (
        <DataTable.Row>
          <DataTable.Title>
            No Activities available for this CLO
          </DataTable.Title>
        </DataTable.Row>
      )}
      <DataTable.Row>
        <DataTable.Title style={{flexGrow: nameColWeight}}>
          Total
        </DataTable.Title>
        {totals.map(t => (
          <DataTable.Cell>{t || '—'}</DataTable.Cell>
        ))}
        <DataTable.Cell>
          {totalAvg ? (totalAvg / activities.length).toFixed(2) : '—'}
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
}
