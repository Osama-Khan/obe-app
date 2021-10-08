import {Header} from '@app/components/header';
import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import {addCourseRoute, viewCourseRoute} from 'src/app.routes';

type P = {navigation: NavigationProp<any>};
export const Home = (props: P) => (
  <>
    <Header />
    <ScrollView style={{paddingHorizontal: 8}}>
      <List.Section title="Courses">
        <List.Item
          title="Add"
          left={() => <List.Icon icon="plus" />}
          onPress={() => props.navigation.navigate(addCourseRoute.name)}
        />
        <List.Item
          title="View"
          left={() => <List.Icon icon="eye" />}
          onPress={() => props.navigation.navigate(viewCourseRoute.name)}
        />
        <List.Item title="Allocate" left={() => <List.Icon icon="sitemap" />} />
      </List.Section>
      <List.Section title="Programs">
        <List.Item title="Add" left={() => <List.Icon icon="plus" />} />
        <List.Item title="View" left={() => <List.Icon icon="eye" />} />
      </List.Section>
      <List.Section title="Teachers">
        <List.Item title="Add" left={() => <List.Icon icon="plus" />} />
        <List.Item title="View" left={() => <List.Icon icon="eye" />} />
      </List.Section>
    </ScrollView>
  </>
);
