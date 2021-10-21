import {FetchingDataTable} from '@app/components/data-table';
import {ConfirmModal} from '@app/components/modal';
import courseService from '@app/services/course.service';
import CourseType from '@app/types/course.type';
import {NavigationProp} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import {addCourseRoute} from 'src/app.routes';

type P = {navigation: NavigationProp<any>};
export const ViewCourseScreen = ({navigation}: P) => {
  const [selected, setSelected] = useState<CourseType>();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          style={{marginVertical: 'auto'}}
          icon="plus-circle"
          color="white"
          onPress={() => navigation.navigate(addCourseRoute.name)}
        />
      ),
    });
  }, []);
  return (
    <>
      <Card style={{margin: 8}} elevation={8}>
        <FetchingDataTable<CourseType>
          fetchMethod={() => courseService.get()}
          columns={[
            {title: 'Title', property: 'title'},
            {title: 'Code', property: 'code'},
            {title: 'Credit Hrs', property: 'creditHours', numeric: true},
            {
              title: 'Actions',
              property: ({item}) => (
                <View style={{flexDirection: 'row'}}>
                  <IconButton
                    color="blue"
                    icon="pencil"
                    style={{margin: 0}}
                    size={18}
                  />
                  <IconButton
                    color="red"
                    icon="delete"
                    style={{margin: 0}}
                    size={18}
                    onPress={() => setSelected(item)}
                  />
                </View>
              ),
              numeric: true,
            },
          ]}
          itemsPerPage={2}
        />
      </Card>
      <ConfirmModal
        title="Delete Course?"
        description={`Are you sure you want to delete the course "${selected?.title}"?`}
        visible={!!selected}
        positiveButton={{
          onPress: () => {
            courseService
              .delete(selected!.id)
              .then(res => {
                ToastAndroid.show(`Course deleted!`, ToastAndroid.LONG);
              })
              .catch(e => {
                ToastAndroid.show(
                  `Could not delete course!`,
                  ToastAndroid.LONG,
                );
              });
            setSelected(undefined);
          },
        }}
        negativeButton={{
          onPress: () => {
            setSelected(undefined);
          },
        }}
        onDismiss={() => {
          setSelected(undefined);
        }}
      />
    </>
  );
};
