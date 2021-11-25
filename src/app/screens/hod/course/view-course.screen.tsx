import {FetchingDataTable} from '@app/components/data-table';
import {ConfirmModal} from '@app/components/modal';
import courseService from '@app/services/course.service';
import uiService from '@app/services/ui.service';
import CourseType from '@app/types/course.type';
import {NavigationProp} from '@react-navigation/core';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Card, IconButton, Text} from 'react-native-paper';
import {
  addCourseRoute,
  courseDetailRoute,
  editCourseRoute,
} from '@app/routes/hod.routes';
import {TouchableOpacity} from 'react-native';

type P = {navigation: NavigationProp<any>};
export const ViewCourseScreen = ({navigation}: P) => {
  const [selected, setSelected] = useState<CourseType[]>([]);
  const [modalShown, setModalShown] = useState(false);
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <IconButton
          icon="delete"
          style={{margin: 8, marginLeft: 'auto'}}
          disabled={selected.length < 1}
          color="red"
          onPress={() => {
            setModalShown(true);
          }}
        />
        <IconButton
          icon="pencil"
          style={{margin: 8}}
          disabled={selected.length !== 1}
          color="#0af"
          onPress={() => {
            navigation.navigate(editCourseRoute.name, {
              courseId: selected[0].id,
            });
          }}
        />
        <Button
          icon="plus"
          style={{margin: 8}}
          mode="contained"
          onPress={() => navigation.navigate(addCourseRoute.name)}>
          Add
        </Button>
      </View>
      <Card style={{margin: 8}} elevation={8}>
        <FetchingDataTable<CourseType>
          fetchMethod={() => courseService.get()}
          checkProperty="id"
          onCheckedChange={setSelected}
          columns={[
            {
              title: 'Title',
              selector: ({item}) => (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(courseDetailRoute.name, {
                        course: item,
                      })
                    }>
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              ),
            },
            {title: 'Code', selector: 'code'},
            {title: 'Credit Hrs', selector: 'creditHours', numeric: true},
          ]}
          itemsPerPage={2}
        />
      </Card>
      <ConfirmModal
        title="Delete Courses?"
        description={`Are you sure you want to delete the courses: [${selected
          .map(s => s.title)
          .join(', ')}]?`}
        visible={modalShown}
        positiveButton={{
          onPress: () => {
            const prms = Promise.all(
              selected.map(s => courseService.delete(s.id)),
            );
            prms
              .then(res => {
                uiService.toastSuccess('Courses deleted!');
                setSelected([]);
              })
              .catch(e => {
                uiService.toastError('Could not delete some courses!');
              })
              .finally(() => {
                setModalShown(false);
              });
          },
        }}
        negativeButton={{
          onPress: () => {
            setModalShown(false);
          },
        }}
        onDismiss={() => {
          setModalShown(false);
        }}
      />
    </>
  );
};
