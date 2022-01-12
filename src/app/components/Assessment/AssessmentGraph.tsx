import {Dropdown} from '@app/components/dropdown';
import {colors} from '@app/styles';
import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {Caption, Card} from 'react-native-paper';
import {WeightComponentPropType} from './types';

type P = WeightComponentPropType & {
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

export default function AssessmentGraph(props: P) {
  const dimens = useWindowDimensions();
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
      <Dropdown
        options={props.clos.map(c => ({name: `CLO ${c.number}`, value: c.id}))}
        onSelect={c => {
          selected.id !== c.value
            ? setSelected(props.clos.find(clo => clo.id === c.value)!)
            : '';
        }}
        style={{marginHorizontal: 16}}
      />
      <PieChart
        data={types.map((c, i) => ({
          name: c.name,
          weight: c.weight,
          color: pieColors[i],
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        }))}
        width={props.chartWidth || dimens.width}
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
