import {useRoute} from '@react-navigation/core';
import React from 'react';
import {ActivityIndicator, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Caption, List} from 'react-native-paper';
import useAssessments from '@app/hooks/useAssessments';
import WeightsCard from './weights-card';

export const AssessmentScreen = () => {
  const dimens = useWindowDimensions();
  const route = useRoute<any>();

  const allocation = route.params.allocation;

  const {assessments, types, clos} = useAssessments(allocation.id);

  return (
    <ScrollView>
      <List.Section title="CLO Distribution">
        {assessments ? (
          assessments.length > 0 ? (
            <WeightsCard
              style={{marginHorizontal: 16, overflow: 'hidden'}}
              assessments={assessments}
              clos={clos!}
              types={types!}
              chartWidth={dimens.width - 32}
            />
          ) : (
            <Caption style={{alignSelf: 'center'}}>No Assessment Data</Caption>
          )
        ) : (
          <ActivityIndicator />
        )}
      </List.Section>
    </ScrollView>
  );
};
