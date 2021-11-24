import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Caption,
  Card,
  Divider,
  FAB,
  Text,
  Title,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {AppStateType} from '@app/store/state';
import allocationService from '@app/services/allocation.service';
import {Criteria, ManyCriteria} from '@app/models/criteria';
import uiService from '@app/services/ui.service';
import sectionService from '@app/services/section.service';
import {AllocationType, ProgramType, SectionType} from '@app/types';
import {colors} from '@app/styles';
import authService from '@app/services/auth.service';

type AllocationProgramType = AllocationType & {program?: ProgramType};

export const Home = () => {
  const user = useSelector((state: AppStateType) => state.user.userData);
  const [allocations, setAllocations] = useState<AllocationProgramType[]>();
  useEffect(() => {
    const criteria = new ManyCriteria<AllocationType>();
    criteria.addCondition('user', user!.id, '=');
    criteria.addRelation('course');
    criteria.addRelation('user');
    criteria.addRelation('section');
    allocationService
      .get(criteria)
      .then(res => {
        const allocs: AllocationProgramType[] = res.data;
        const pCrit = new Criteria<SectionType>();
        pCrit.addRelation('program');
        Promise.all(
          allocs.map((a, i) =>
            sectionService
              .getOne(a.section!.id, pCrit)
              .then(res => {
                allocs[i].program = res.data.program!;
              })
              .then(() => {
                setAllocations(allocs);
              }),
          ),
        );
      })
      .catch(e => uiService.toastError('Failed to fetch allocation data!'));
  }, []);

  return (
    <>
      <Caption style={{margin: 16, marginTop: 16}}>My Allocations</Caption>
      {allocations ? (
        allocations.length > 0 ? (
          allocations.map(a => (
            <Card style={{margin: 16}}>
              <Title style={{margin: 16, marginTop: 16}}>
                {a.course!.title}
              </Title>
              <Caption style={{margin: 16, marginBottom: 16}}>
                Teaching in {a.program!.title}-{a.section!.semester}
                {a.section!.name}
              </Caption>
              <Divider />
              <Button style={{}} icon="clipboard-plus">
                Add Activity
              </Button>
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
      <FAB
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          backgroundColor: colors.red,
        }}
        onPress={() => authService.logout()}
        icon="logout"
      />
    </>
  );
};
