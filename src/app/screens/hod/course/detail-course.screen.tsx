import {FetchingDataTable} from '@app/components/data-table';
import Modal from '@app/components/modal';
import {ManyCriteria} from '@app/models/criteria';
import cloService from '@app/services/clo.service';
import {CLOType, CourseType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {Button, Card, IconButton, Text} from 'react-native-paper';
import AddCloView from './add-clo.view';

let criteria: ManyCriteria<CLOType>;

export const CourseDetailScreen = () => {
  const [selected, setSelected] = useState<CLOType[]>([]);
  const [modalShown, setModalShown] = useState(false);
  const [updates, setUpdates] = useState(0);
  const route = useRoute<any>();
  const navigation = useNavigation();
  const course: CourseType = route.params!.course;
  useMemo(() => {
    criteria = new ManyCriteria<CLOType>();
    criteria.addRelation('plos');
    criteria.addCondition('course', course.id);
    navigation.setOptions({headerTitle: course.title + ' CLOs'});
  }, []);
  return (
    <>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <IconButton
          icon="delete"
          style={{margin: 8, marginLeft: 'auto'}}
          disabled={selected.length < 1}
          color="red"
          onPress={() => {
            setModalShown(true);
          }}
        />
        <Button
          icon="plus"
          style={{margin: 8}}
          mode="contained"
          onPress={() => {
            setModalShown(true);
          }}>
          Add
        </Button>
      </View>
      <Card style={{margin: 8}}>
        <FetchingDataTable
          key={updates}
          fetchMethod={c => cloService.get(c)}
          criteria={criteria}
          columns={[
            {title: 'Title', property: 'title', weight: 0.4},
            {
              title: 'PLOs',
              property: ({item}) => {
                const plos =
                  item.plos?.map(p => p.title).join(', ') || 'No PLOs set';
                return <Text>{plos}</Text>;
              },
              weight: 1,
            },
          ]}
          onCheckedChange={c => setSelected(c)}
          checkProperty="id"
        />
      </Card>
      <Modal visible={modalShown} onDismiss={() => setModalShown(false)}>
        <AddCloView
          onAdd={() => {
            setUpdates(updates + 1);
            setModalShown(false);
          }}
          courseId={course.id}
        />
      </Modal>
    </>
  );
};
