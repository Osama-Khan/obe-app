import Modal from '@app/components/modal';
import {ManyCriteria} from '@app/models/criteria';
import activityService from '@app/services/activity.service';
import cloService from '@app/services/clo.service';
import uiService from '@app/services/ui.service';
import {ActivityType, AllocationType, CLOType, ProgramType} from '@app/types';
import {useRoute} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {ActivityIndicator, Caption, FAB} from 'react-native-paper';
import ActivityCard from './activity-card';
import AddActivityView from './add-activity.view';

export const ActivitiesScreen = () => {
  const [activities, setActivities] = useState<ActivityType[]>();
  const [clos, setClos] = useState<CLOType[]>();
  const [modalShown, setModalShown] = useState(false);
  const [updates, setUpdates] = useState(0);
  const route = useRoute<any>();
  const allocation: AllocationType & {program: ProgramType} =
    route.params!.allocation;

  const getCloUsage = (id: string) => {
    if (!clos || !activities) return -1;
    const clo = clos.find(c => c.id === id);
    if (!clo) return -1;
    let weight = 0;
    activities.forEach(a => {
      const map = a.maps!.find(map => map.clo!.id === id);
      if (map) weight += map.weight;
    });
    return weight;
  };

  useEffect(() => {
    const cloCrit = new ManyCriteria<CLOType>();
    cloCrit.addCondition('course', allocation.course!.id);
    cloService
      .get(cloCrit)
      .then(r => setClos(r.data))
      .catch(e => uiService.toastError('Could not fetch CLOs!'));
    const activityCrit = new ManyCriteria<ActivityType>();
    activityCrit.addRelation('maps');
    activityCrit.addRelation('type');
    activityCrit.addCondition('section', allocation.section!.id);
    activityService
      .get(activityCrit)
      .then(r => setActivities(r.data))
      .catch(e => uiService.toastError('Could not fetch CLOs!'));
  }, [updates]);

  return activities ? (
    <>
      {activities.length > 0 ? (
        <FlatList
          data={activities}
          renderItem={({item}) => (
            <ActivityCard key={item.id} activity={item} />
          )}
          ListEmptyComponent={
            <Caption style={{alignSelf: 'center', marginVertical: 16}}>
              No Activities Found
            </Caption>
          }
        />
      ) : (
        <Caption style={{alignSelf: 'center', marginVertical: 16}}>
          No Activities Found
        </Caption>
      )}
      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
        onPress={() => {
          setModalShown(true);
        }}
      />

      <Modal visible={modalShown} onDismiss={() => setModalShown(false)}>
        {clos ? (
          <AddActivityView
            onAdd={() => {
              setUpdates(updates + 1);
              setModalShown(false);
            }}
            course={allocation.course!}
            section={allocation.section!}
            clos={clos.map(c => ({...c, weight: getCloUsage(c.id)}))}
          />
        ) : (
          <ActivityIndicator />
        )}
      </Modal>
    </>
  ) : (
    <ActivityIndicator style={{margin: 16, alignSelf: 'center'}} />
  );
};
