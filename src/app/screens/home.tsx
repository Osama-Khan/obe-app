import {NavigationProp} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {
  Caption,
  Card,
  Divider,
  IconButton,
  List,
  Title,
} from 'react-native-paper';
import {
  allocationRoute,
  loginRoute,
  viewCourseRoute,
  viewProgramRoute,
  viewUsersRoute,
} from 'src/app.routes';
import Icon from '@app/components/icon';
import Modal from '@app/components/modal';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '@app/store/state';
import {userActions} from '@app/store/actions';
import {StackActions} from '@react-navigation/native';

type P = {navigation: NavigationProp<any>};

export const Home = (props: P) => {
  const user = useSelector((state: AppStateType) => state.user.userData);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    props.navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitleAllowFontScaling: true,
      headerRight: () => (
        <IconButton
          icon="account"
          onPress={() => setVisible(true)}
          color="#fff"
        />
      ),
    });
  }, []);
  const goto = (r: string) => props.navigation.navigate(r);
  return user ? (
    <>
      <IconCard
        icon="bookshelf"
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
      <IconCard
        icon="sitemap"
        title="Allocate Courses"
        onPress={() => goto(allocationRoute.name)}
      />
      <Modal visible={visible} onDismiss={() => setVisible(false)}>
        <View style={{padding: 8}}>
          <Title>{user.username}</Title>
          <Caption>{user.role?.name}</Caption>
          <Divider style={{marginVertical: 8}} />
          <List.Item
            title="Log out"
            titleStyle={{color: '#f22'}}
            description="Hold to logout"
            left={() => <List.Icon icon="logout" color="#f22" />}
            onPress={() => {
              dispatch(userActions.clearUser());
              props.navigation.dispatch(StackActions.replace(loginRoute.name));
            }}
          />
        </View>
      </Modal>
    </>
  ) : (
    <></>
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
