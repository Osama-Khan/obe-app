import {NavigationProp} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {viewUsersRoute} from '@app/routes/admin.routes';
import Icon from '@app/components/icon';
import {useSelector} from 'react-redux';
import {AppStateType} from '@app/store/state';
import {colors} from '@app/styles';
import {LogoutFAB} from '@app/components/FAB';

type P = {navigation: NavigationProp<any>};

export const Home = (props: P) => {
  const user = useSelector((state: AppStateType) => state.user.userData);
  useEffect(() => {
    props.navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitleAllowFontScaling: true,
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
      <LogoutFAB />
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
