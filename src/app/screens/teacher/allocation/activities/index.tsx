import {ManyCriteria} from '@app/models/criteria';
import {addActivityRoute} from '@app/routes/teacher.routes';
import activityService from '@app/services/activity.service';
import uiService from '@app/services/ui.service';
import {ActivityType, AllocationType, ProgramType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {ActivityIndicator, Caption, FAB} from 'react-native-paper';
import ActivityCard from './activity-card';

export const ActivitiesScreen = () => {
  const [activities, setActivities] = useState<ActivityType[]>();
  const [updates, setUpdates] = useState(0);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const allocation: AllocationType & {program: ProgramType} =
    route.params!.allocation;

  useEffect(() => {
    const activityCrit = new ManyCriteria<ActivityType>();
    activityCrit.addRelation('maps');
    activityCrit.addRelation('type');
    activityCrit.addCondition('section', allocation.section!.id);
    activityService
      .get(activityCrit)
      .then(r => setActivities(r.data))
      .catch(() => uiService.toastError('Could not fetch Exams!'));
  }, [updates]);

  return activities ? (
    <>
      <FlatList
        data={activities}
        renderItem={({item}) => <ActivityCard key={item.id} activity={item} />}
        ListEmptyComponent={
          <Caption style={{alignSelf: 'center', marginVertical: 16}}>
            No Exams Found
          </Caption>
        }
        ListFooterComponent={<View style={{height: 76}} />}
      />
      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
        onPress={() => {
          navigation.navigate(addActivityRoute.name, {
            onAdd: () => {
              setUpdates(updates + 1);
            },
            allocation,
          });
        }}
      />
    </>
  ) : (
    <ActivityIndicator style={{margin: 16, alignSelf: 'center'}} />
  );
};
