import {ManyCriteria} from '@app/models/criteria';
import assessmentService from '@app/services/assessment.service';
import {colors} from '@app/styles';
import {ActivityTypeType, AssessmentType, CLOType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, useWindowDimensions, View} from 'react-native';
import {StackedBarChart} from 'react-native-chart-kit';
import {
  ActivityIndicator,
  Caption,
  Card,
  List,
  Title,
} from 'react-native-paper';
import WeightsCard from './weights-card';

export default function AllocationDetail() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const dimens = useWindowDimensions();
  const [assessments, setAssessments] = useState<AssessmentType[]>();
  const [types, setTypes] = useState<ActivityTypeType[]>();
  const [clos, setClos] = useState<CLOType[]>();
  const allocation = route.params!.allocation;

  const sectionName = `${allocation.program!.title}-${
    allocation.section!.semester
  }${allocation.section!.name}`;

  useEffect(() => {
    const crit = new ManyCriteria<AssessmentType>();
    crit.addRelation('clo');
    crit.addRelation('type');
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

  useMemo(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{flexDirection: 'row'}}>
          <Title style={{color: 'white'}}>{allocation.course!.title}</Title>
          <Caption
            style={{
              alignSelf: 'flex-end',
              marginLeft: 8,
              color: 'white',
              opacity: 0.7,
            }}>
            ({sectionName})
          </Caption>
        </View>
      ),
    });
  }, []);

  return (
    <ScrollView>
      <List.Section title="CLO Distribution">
        {assessments ? (
          <WeightsCard
            style={{marginHorizontal: 16, overflow: 'hidden'}}
            assessments={assessments}
            clos={clos!}
            types={types!}
            chartWidth={dimens.width - 32}
          />
        ) : (
          <ActivityIndicator />
        )}
      </List.Section>
    </ScrollView>
  );
}
