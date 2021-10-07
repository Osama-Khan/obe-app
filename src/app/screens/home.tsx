import {Header} from '@app/components/header';
import React from 'react';
import {ScrollView} from 'react-native';
import {Button, Title} from 'react-native-paper';

export const Home = () => (
  <>
    <Header />
    <ScrollView>
      <Title>Courses</Title>
      <Button onPress={() => {}}>Add</Button>
      <Button onPress={() => {}}>View</Button>
      <Button onPress={() => {}}>Allocate</Button>
      <Title>Programs</Title>
      <Button onPress={() => {}}>Add</Button>
      <Button onPress={() => {}}>View</Button>
      <Title>Teachers</Title>
      <Button onPress={() => {}}>Add</Button>
      <Button onPress={() => {}}>View</Button>
    </ScrollView>
  </>
);
