import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Caption,
  Card,
  IconButton,
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
import {FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {allocationDetailRoute} from '@app/routes/teacher.routes';
import {LogoutFAB} from '@app/components/FAB';

type AllocationProgramType = AllocationType & {program?: ProgramType};

export const Home = () => {
  const user = useSelector((state: AppStateType) => state.user.userData);
  const navigation = useNavigation();
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
            sectionService.getOne(a.section!.id, pCrit).then(res => {
              allocs[i].program = res.data.program!;
            }),
          ),
        ).then(() => {
          setAllocations(allocs);
        });
      })
      .catch(e => uiService.toastError('Failed to fetch allocation data!'));
  }, []);

  return (
    <>
      {allocations ? (
        <FlatList
          data={allocations}
          renderItem={({item}) => (
            <Card
              key={item.id}
              style={{
                marginHorizontal: 16,
                marginVertical: 8,
                overflow: 'hidden',
              }}
              onPress={() => {
                navigation.navigate(allocationDetailRoute.name, {
                  allocation: item,
                });
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Title style={{margin: 16, marginTop: 16}}>
                    {item.course!.titleShort}
                  </Title>
                  <Caption style={{margin: 16, marginBottom: 16}}>
                    Teaching in {item.program!.title}-{item.section!.semester}
                    {item.section!.name}
                  </Caption>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    backgroundColor: colors.primary,
                  }}>
                  <IconButton icon="chevron-right" color="white" />
                </View>
              </View>
            </Card>
          )}
          ListHeaderComponent={
            allocations?.length > 0 ? (
              <Caption style={{margin: 16, marginTop: 16}}>
                My Allocations
              </Caption>
            ) : (
              <></>
            )
          }
          ListEmptyComponent={
            <Caption style={{alignSelf: 'center', margin: 16}}>
              You don't have any allocated courses
            </Caption>
          }
        />
      ) : (
        <ActivityIndicator />
      )}
      <LogoutFAB />
    </>
  );
};
