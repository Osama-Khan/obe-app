import {FetchingCardList} from '@app/components/listing';
import courseService from '@app/services/course.service';
import CourseType from '@app/types/course.type';
import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {Button} from 'react-native-paper';
import {addCourseRoute} from 'src/app.routes';

type P = {navigation: NavigationProp<any>};
export const ViewCourseScreen = ({navigation}: P) => {
  return (
    <>
      <Button
        icon="plus"
        style={{margin: 8, marginLeft: 'auto'}}
        mode="contained"
        onPress={() => navigation.navigate(addCourseRoute.name)}>
        Add
      </Button>
      <FetchingCardList<CourseType>
        fetchMethod={() => courseService.get()}
        description={item =>
          item.programs
            ? item.programs?.map(p => p.title).join(',')
            : 'No Programs'
        }
        title={item => item.title}
      />
    </>
  );
};
