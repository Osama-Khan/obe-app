import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Button, Card, IconButton, Text} from 'react-native-paper';
import uiService from '@app/services/ui.service';
import allocationService from '@app/services/allocation.service';
import sectionService from '@app/services/section.service';
import {Criteria, ManyCriteria} from '@app/models/criteria';
import {AllocationType, ProgramType, SectionType} from '@app/types';
import {DataTable} from '@app/components/data-table';
import {useNavigation} from '@react-navigation/core';
import {
  allocationDetailRoute,
  allocationUploadRoute,
} from '@app/routes/hod.routes';
import {TouchableOpacity} from 'react-native-gesture-handler';

type AllocationProgramType = AllocationType & {program?: ProgramType};

export function AllocationScreen() {
  const [allocs, setAllocs] = useState<any[]>();
  const navigation = useNavigation();

  const fetchData = () => {
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
            sectionService.getOne(a.section!.id, pCrit).then(res => {
              allocs[i].program = res.data.program!;
            }),
          ),
        ).then(() => setAllocs(allocs));
      })
      .catch(e => uiService.toastError('Failed to fetch allocation data!'));
  };
  useEffect(() => {
    navigation.addListener('focus', fetchData);
    fetchData();
  }, []);

  return (
    <View>
      {allocs ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Button
              icon="file-upload"
              style={{margin: 8}}
              mode="contained"
              onPress={() => navigation.navigate(allocationUploadRoute.name)}>
              Upload
            </Button>
          </View>
          <Card style={{margin: 8}}>
            <DataTable
              data={allocs}
              rowOnPress={item =>
                navigation.navigate(allocationDetailRoute.name, {
                  course: item.course,
                })
              }
              columns={[
                {
                  selector: ({item}) => (
                    <Text>
                      {item.program!.title}-{item.section!.semester}
                      {item.section!.name}
                    </Text>
                  ),
                  title: 'Section',
                },
                {
                  selector: ({item}) => <Text>{item.course!.title}</Text>,
                  title: 'Course',
                },
                {
                  selector: ({item}) => <Text>{item.user!.username}</Text>,
                  title: 'Teacher',
                },
              ]}
            />
          </Card>
        </>
      ) : (
        <ActivityIndicator style={{margin: 16, alignSelf: 'center'}} />
      )}
    </View>
  );
}
