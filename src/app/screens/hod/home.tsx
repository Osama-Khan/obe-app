import {useNavigation} from '@react-navigation/core';
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
  viewPlosRoute,
  viewCourseRoute,
  viewProgramRoute,
} from '@app/routes/hod.routes';
import Icon from '@app/components/icon';
import Modal from '@app/components/modal';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '@app/store/state';
import {colors} from '@app/styles';
import authService from '@app/services/auth.service';

export const Home = () => {
  const user = useSelector((state: AppStateType) => state.user.userData);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
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
  const goto = (r: string) => navigation.navigate(r);
  return user ? (
    <>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
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
          icon="clipboard-account"
          title="Allocate Courses"
          onPress={() => goto(allocationRoute.name)}
        />
        <IconCard
          icon="sitemap"
          title="Manage PLOs"
          onPress={() => goto(viewPlosRoute.name)}
        />
      </View>
      <Modal visible={visible} onDismiss={() => setVisible(false)}>
        <View style={{padding: 8}}>
          <Title>{user.username}</Title>
          <Caption>{user.role?.name}</Caption>
          <Divider style={{marginVertical: 8}} />
          <List.Item
            title="Log out"
            titleStyle={{color: colors.red}}
            left={() => <List.Icon icon="logout" color={colors.red} />}
            onPress={() => {
              authService.logout();
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
  <Card
    style={{margin: '2%', overflow: 'hidden', width: '46%'}}
    elevation={8}
    onPress={onPress}>
    <View style={{alignItems: 'center'}}>
      <View
        style={{
          padding: 8,
          width: '100%',
          backgroundColor: colors.primary,
          alignItems: 'center',
        }}>
        <Icon name={icon} size={96} color="#fffa" />
      </View>
      <Title style={{marginLeft: 8}}>{title}</Title>
    </View>
  </Card>
);
