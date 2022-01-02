import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Card, FAB, Title} from 'react-native-paper';
import {
  allocationRoute,
  sectionsRoute,
  viewProgramRoute,
} from '@app/routes/hod.routes';
import Icon from '@app/components/icon';
import {useSelector} from 'react-redux';
import {AppStateType} from '@app/store/state';
import {colors} from '@app/styles';
import authService from '@app/services/auth.service';

export const Home = () => {
  const user = useSelector((state: AppStateType) => state.user.userData);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitleAllowFontScaling: true,
    });
  }, []);
  const goto = (r: string) => navigation.navigate(r);
  return user ? (
    <>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
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
          icon="select-group"
          title="Sections"
          onPress={() => goto(sectionsRoute.name)}
        />
      </View>
      <FAB
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          backgroundColor: colors.red,
        }}
        onPress={authService.logout}
        icon="logout"
      />
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
