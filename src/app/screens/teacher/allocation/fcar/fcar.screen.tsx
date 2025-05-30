import {ManyCriteria} from '@app/models/criteria';
import activityService from '@app/services/activity.service';
import cloService from '@app/services/clo.service';
import uiService from '@app/services/ui.service';
import {ActivityType, AllocationType, CLOType} from '@app/types';
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {
  Text,
  Card,
  Title,
  Caption,
  Divider,
  ActivityIndicator,
} from 'react-native-paper';
import FCARTable from './fcar.table';

const useClos = (courseId: string) => {
  const [clos, setClos] = useState<CLOType[]>();
  useEffect(() => {
    const criteria = new ManyCriteria<CLOType>();
    criteria.addCondition('course', courseId);
    criteria.addRelation('maps');
    criteria.addRelation('activityMaps');
    cloService
      .get(criteria)
      .then(res => {
        setClos(res.data.sort((a, b) => a.number - b.number));
      })
      .catch(() => uiService.toastError('Could not fetch clos!'));
  }, []);
  return clos;
};

const useActivities = (allocationId: string) => {
  const [activities, setActivities] = useState<ActivityType[]>();
  useEffect(() => {
    const criteria = new ManyCriteria<ActivityType>();
    criteria.addCondition('allocation', allocationId);
    criteria.addRelation('evaluations');
    activityService
      .get(criteria)
      .then(res => {
        setActivities(res.data);
      })
      .catch(() => uiService.toastError('Could not fetch activities!'));
  }, []);
  return activities;
};

export default function FCARScreen() {
  const route = useRoute<any>();
  const allocation: AllocationType = route.params!.allocation;
  const clos = useClos(allocation.course!.id);
  const activities = useActivities(allocation.id);

  return (
    <ScrollView>
      <Card style={{margin: 8}}>
        <Caption style={{textAlign: 'center'}}>
          Faculty Course Assessment Report
        </Caption>
        <Title style={{textAlign: 'center', fontWeight: 'bold'}}>
          {allocation.section!.id}
        </Title>
        <Text style={{textAlign: 'center'}}>{allocation.course!.title}</Text>
        {clos && activities ? (
          <>
            <Divider style={{marginTop: 12}} />
            <Header>CLO-PLO Mapping</Header>
            {clos.map(c => (
              <>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Title style={{marginHorizontal: 8}}>CLO {c.number}</Title>
                  <Caption style={{marginHorizontal: 8}}>
                    {c.maps!.map(m => m.plo!.title).join('\n')}
                  </Caption>
                </View>
                <Divider />
              </>
            ))}
            {clos.map(c => (
              <>
                <Divider style={{marginTop: 12}} />
                <Header>CLO {c.number}</Header>
                <Card style={{margin: 8, overflow: 'hidden'}} mode="outlined">
                  <FCARTable
                    activities={activities.filter(a =>
                      c.activityMaps.some(m => m.activity.id === a.id),
                    )}
                  />
                </Card>
              </>
            ))}
          </>
        ) : (
          <ActivityIndicator style={{margin: 16, alignSelf: 'center'}} />
        )}
      </Card>
    </ScrollView>
  );
}

const Header = ({children}: any) => (
  <Text style={{margin: 8, fontWeight: 'bold', textAlign: 'center'}}>
    {children}
  </Text>
);
