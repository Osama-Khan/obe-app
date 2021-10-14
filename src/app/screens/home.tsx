import {NavigationProp} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {
  viewCourseRoute,
  viewProgramRoute,
  viewUsersRoute,
} from 'src/app.routes';
import Icon from '@app/components/icon';

type P = {navigation: NavigationProp<any>};
export const Home = (props: P) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitleAllowFontScaling: true,
    });
  }, []);
  const goto = (r: string) => props.navigation.navigate(r);
  return (
    <>
      <IconCard
        icon="book"
        title="Courses"
        onPress={() => goto(viewCourseRoute.name)}
      />
      <IconCard
        icon="folder"
        title="Programs"
        onPress={() => goto(viewProgramRoute.name)}
      />
      <IconCard
        icon="account"
        title="Users"
        onPress={() => goto(viewUsersRoute.name)}
      />
    </>
  );
};

const IconCard = ({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: string;
  onPress: () => void;
}) => (
  <Card style={{margin: 8, overflow: 'hidden'}} elevation={8} onPress={onPress}>
    <View style={{alignItems: 'center', flexDirection: 'row'}}>
      <Icon
        name={icon}
        size={48}
        style={{padding: 8, backgroundColor: '#70f'}}
      />
      <Title style={{marginLeft: 8}}>{title}</Title>
    </View>
  </Card>
);
