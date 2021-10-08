import courseService from '@app/services/course.service';
import CourseType from '@app/types/course.type';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Caption, Card, Text, Title} from 'react-native-paper';

export const ViewCourseScreen = () => {
  const [data, setData] = useState<CourseType[]>();
  useEffect(() => {
    courseService
      .get()
      .then(res => {
        setData(res.data);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);
  return (
    <FlatList
      data={data}
      ListHeaderComponent={() => <Title>Courses</Title>}
      renderItem={info => (
        <Card style={{margin: 4, padding: 4}} key={info.index}>
          <Text>{info.item.name}</Text>
          <Caption>{info.item.id}</Caption>
        </Card>
      )}
    />
  );
};
