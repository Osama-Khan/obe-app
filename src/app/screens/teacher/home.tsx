import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Caption,
  Card,
  Text,
  Title,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {AppStateType} from '@app/store/state';
import allocationService from '@app/services/allocation.service';
import {ManyCriteria} from '@app/models/criteria';
import uiService from '@app/services/ui.service';

export const Home = () => {
  const user = useSelector((state: AppStateType) => state.user.userData);
  const [allocations, setAllocations] = useState<any[]>();
  useEffect(() => {
    const criteria = new ManyCriteria<any>();
    criteria.addCondition('user', user!.id, '=');
    criteria.addRelation('course');
    criteria.addRelation('user');
    criteria.addRelation('section');
    allocationService
      .get(criteria)
      .then(res => {
        setAllocations(res.data);
      })
      .catch(e => uiService.toastError('Failed to fetch allocation data!'));
  }, []);

  return (
    <>
      <Caption style={{margin: 16, marginTop: 16}}>My Allocations</Caption>
      {allocations ? (
        allocations.length > 0 ? (
          allocations.map(a => (
            <Card style={{margin: 16, padding: 16}}>
              <Title>{a.course.title}</Title>
              <Caption>
                Teaching in {a.section.semester}
                {a.section.name}
              </Caption>
            </Card>
          ))
        ) : (
          <Text style={{alignSelf: 'center', margin: 16}}>
            You don't have any allocated courses
          </Text>
        )
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};
