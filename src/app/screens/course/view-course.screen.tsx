import {FetchingCardList} from '@app/components/listing';
import {ConfirmModal} from '@app/components/modal';
import courseService from '@app/services/course.service';
import CourseType from '@app/types/course.type';
import {NavigationProp} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import {IconButton} from 'react-native-paper';
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
      <FetchingCardList<CourseType>
        fetchMethod={() => courseService.get()}
        title={item => item.title}
        description={item => item.code}
        handleDelete={item => {
          setSelected(item);
        }}
      />
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
