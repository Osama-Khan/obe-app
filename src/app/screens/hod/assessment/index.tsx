import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {ActivityIndicator, List} from 'react-native-paper';
import uiService from '@app/services/ui.service';
import allocationService from '@app/services/allocation.service';
import {Criteria, ManyCriteria} from '@app/models/criteria';
import {AllocationType, ProgramType, SectionType} from '@app/types';
import sectionService from '@app/services/section.service';

type AllocationProgramType = AllocationType & {program?: ProgramType};

export function AssessmentScreen() {
  const [allocs, setAllocs] = useState<any[]>();

  useEffect(() => {
    const criteria = new ManyCriteria<AllocationType>();
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
                setAllocs(allocs);
              }),
          ),
        );
      })
      .catch(e => uiService.toastError('Failed to fetch allocation data!'));
  }, []);

  return (
    <View>
      {allocs ? (
        <List.Section title="Choose Allocation">
          <FlatList
            data={allocs}
            renderItem={({item}) => (
              <List.Item
                title={item.course!.title}
                style={{backgroundColor: 'white', marginVertical: 4}}
                titleStyle={{fontWeight: 'bold', fontSize: 22}}
                description={`${item.program!.title}-${item.section!.semester}${
                  item.section!.name
                } | ${item.user?.username}`}
                right={p => <List.Icon {...p} icon="chevron-right" />}
                onPress={() => {}}
              />
            )}
          />
        </List.Section>
      ) : (
        <ActivityIndicator style={{margin: 16, alignSelf: 'center'}} />
      )}
    </View>
  );
}
