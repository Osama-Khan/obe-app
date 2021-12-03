import {colors} from '@app/styles';
import {ActivityTypeType, AssessmentType, CLOType} from '@app/types';
import React, {useState} from 'react';
import {FlatList, View, ViewProps} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {Caption, Card, Chip} from 'react-native-paper';

type P = ViewProps & {
  clos: CLOType[];
  types: ActivityTypeType[];
  assessments: AssessmentType[];
  chartWidth: number;
};

const pieColors = [
  colors.primaryLight,
  '#2196f3',
  '#1e88e5',
  colors.primary,
  '#1565c0',
  colors.primaryDark,
];

export default function WeightsCard(props: P) {
  const [selected, setSelected] = useState(props.clos[0]);
  const types = props.types.map(t => {
    const weights = props.assessments
      .filter(a => a.type.id === t.id && a.clo.id === selected.id)
      .map(a => a.weight);
    const weight = weights.length > 0 ? weights.reduce((a, b) => a + b) : 0;
    return {...t, weight};
  });
  return (
    <Card {...props}>
      <Caption style={{marginTop: 8, marginLeft: 8}}>
        Select CLO to view weight distribution.
      </Caption>
      <FlatList
        horizontal
        data={props.clos}
        renderItem={({item: c}) => (
          <Chip
            selected={selected.id === c.id}
            onPress={() => {
              selected.id !== c.id ? setSelected(c) : '';
            }}
            style={{marginTop: 8, marginHorizontal: 8}}>
            {c.title}
          </Chip>
        )}
      />
      <PieChart
        data={types.map((c, i) => ({
          name: c.name,
          weight: c.weight,
          color: pieColors[i],
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        }))}
        width={props.chartWidth}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor={'weight'}
        backgroundColor={'white'}
      />
    </Card>
  );
}
