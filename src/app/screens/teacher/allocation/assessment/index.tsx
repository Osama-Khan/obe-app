import {ManyCriteria} from '@app/models/criteria';
import assessmentService from '@app/services/assessment.service';
import {ActivityTypeType, AssessmentType, CLOType} from '@app/types';
import {useRoute} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Caption, List} from 'react-native-paper';
import WeightsCard from './weights-card';

export const AssessmentScreen = () => {
  const dimens = useWindowDimensions();
  const route = useRoute<any>();
  const [assessments, setAssessments] = useState<AssessmentType[]>();
  const [types, setTypes] = useState<ActivityTypeType[]>();
  const [clos, setClos] = useState<CLOType[]>();

  const allocation = route.params.allocation;

  useEffect(() => {
    const crit = new ManyCriteria<AssessmentType>();
    crit.addRelation('clo');
    crit.addRelation('type');
    crit.addCondition('allocation', allocation.id);
    assessmentService.get(crit).then(r => {
      const t: ActivityTypeType[] = [];
      const c: CLOType[] = [];
      for (const d of r.data) {
        if (!t.find(t => t.id === d.type.id)) {
          t.push(d.type);
        }
        if (!c.find(c => c.id === d.clo.id)) {
          c.push(d.clo);
        }
      }
      setTypes(t);
      setClos(c);
      setAssessments(r.data);
    });
  }, []);
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
