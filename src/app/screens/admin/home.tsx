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
import {viewUsersRoute} from '@app/routes/admin.routes';
import Icon from '@app/components/icon';
import Modal from '@app/components/modal';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '@app/store/state';
import {userActions} from '@app/store/actions';
import {colors} from '@app/styles';

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
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <IconCard
          icon="account"
          title="Users"
          onPress={() => goto(viewUsersRoute.name)}
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
              dispatch(userActions.clearUser());
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
