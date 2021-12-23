import {useRoute} from '@react-navigation/core';
import React, {useState} from 'react';
import {ActivityIndicator, useWindowDimensions, View} from 'react-native';
import {BottomNavigation, Caption, List} from 'react-native-paper';
import useAssessments from '@app/hooks/useAssessments';
import WeightsGraph from './weights-graph';
import WeightsTable from './weights-table';
import {WeightComponentPropType} from './types';

export const AssessmentScreen = () => {
  const route = useRoute<any>();

  const course = route.params.course;
  const {assessments, types, clos} = useAssessments(course.id);

  return (
    <View style={{flexGrow: 1}}>
      {assessments && clos && types ? (
        assessments.length > 0 ? (
          <NavigationComponent
            assessments={assessments}
            types={types}
            clos={clos}
          />
        ) : (
          <Caption style={{alignSelf: 'center', marginTop: 16}}>
            No Assessment Data
          </Caption>
        )
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const NavigationComponent = ({
  assessments,
  clos,
  types,
}: WeightComponentPropType) => {
  const dimens = useWindowDimensions();

  const TableRoute = () => (
    <WeightsTable
      style={{marginVertical: 8, marginHorizontal: 16, overflow: 'hidden'}}
      assessments={assessments}
      clos={clos}
      types={types}
    />
  );

  const GraphRoute = () => (
    <WeightsGraph
      style={{marginVertical: 8, marginHorizontal: 16, overflow: 'hidden'}}
      assessments={assessments}
      clos={clos}
      types={types}
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
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={true}
    />
  );
};
