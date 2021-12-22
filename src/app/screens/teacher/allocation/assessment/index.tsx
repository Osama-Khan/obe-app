import {useRoute} from '@react-navigation/core';
import React, {useState} from 'react';
import {ActivityIndicator, useWindowDimensions, View} from 'react-native';
import {BottomNavigation, Caption, List} from 'react-native-paper';
import useAssessments from '@app/hooks/useAssessments';
import WeightsGraph from './weights-graph';
import WeightsTable from './weights-table';

export const AssessmentScreen = () => {
  const dimens = useWindowDimensions();
  const route = useRoute<any>();

  const allocation = route.params.allocation;
  const {assessments, types, clos} = useAssessments(allocation.id);

  const TableRoute = () => (
    <WeightsTable
      style={{marginHorizontal: 16, overflow: 'hidden'}}
      assessments={assessments!}
      clos={clos!}
      types={types!}
    />
  );

  const GraphRoute = () => (
    <WeightsGraph
      style={{marginHorizontal: 16, overflow: 'hidden'}}
      assessments={assessments!}
      clos={clos!}
      types={types!}
      chartWidth={dimens.width - 32}
    />
  );

  const [index, setIndex] = useState(0);

  const [routes] = React.useState([
    {key: 'table', title: 'Table', icon: 'table'},
    {key: 'graph', title: 'Graph', icon: 'chart-pie'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    table: TableRoute,
    graph: GraphRoute,
  });

  return (
    <View style={{flexGrow: 1}}>
      {assessments ? (
        assessments.length > 0 ? (
          <>
            <List.Section title="CLO Distribution" />
            <BottomNavigation
              navigationState={{index, routes}}
              onIndexChange={setIndex}
              renderScene={renderScene}
              shifting={true}
            />
          </>
        ) : (
          <Caption style={{alignSelf: 'center'}}>No Assessment Data</Caption>
        )
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};
