import {useAssessments} from '@app/hooks';
import {colors} from '@app/styles';
import {ActivityType} from '@app/types';
import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {Button, Card} from 'react-native-paper';

export default function CLOSummary({
  courseId,
  activities,
}: {
  courseId: string;
  activities: ActivityType[];
}) {
  const {clos} = useAssessments(courseId);
  const [summaryShown, setSummaryShown] = useState(false);
  const width = useWindowDimensions().width;
  const getEvalWeight = (cloId: string) =>
    activities
      ?.map(a => a.maps.find(a => a.clo.id === cloId))
      .map(a => a?.weight || 0)
      .reduce((a, b) => a + b);
  return (
    <>
      <Button
        icon={summaryShown ? 'close' : 'chart-bar'}
        style={{marginTop: 8, marginHorizontal: 16}}
        onPress={() => {
          setSummaryShown(!summaryShown);
        }}>
        {summaryShown ? 'Hide' : 'View'} CLO Summary
      </Button>
      {summaryShown ? (
        <Card style={{margin: 16, overflow: 'hidden'}}>
          <ProgressChart
            data={{
              labels: clos?.map(c => 'CLO ' + c.number) || [],
              data: clos?.map(c => getEvalWeight(c.id) / 100) || [],
            }}
            width={width - 32}
            height={240}
            strokeWidth={12}
            radius={16}
            chartConfig={{
              backgroundGradientFrom: colors.primaryLight,
              backgroundGradientTo: colors.primary,
              color: (o = 1) => `rgb(255,255,255,${o})`,
              labelColor: (o = 1) => `rgb(255,255,255,${o})`,
              propsForLabels: {fontWeight: 'bold'},
            }}
          />
        </Card>
      ) : (
        <></>
      )}
    </>
  );
}
