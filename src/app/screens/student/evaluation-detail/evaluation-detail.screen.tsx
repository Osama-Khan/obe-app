import {FetchingFlatList} from '@app/components/listing';
import userService from '@app/services/user.service';
import {AppStateType} from '@app/store/state';
import {AppTheme, colors} from '@app/styles';
import {CLOType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {
  Card,
  Title,
  Caption,
  List,
  Divider,
  ProgressBar,
} from 'react-native-paper';
import {useSelector} from 'react-redux';

export default function EvaluationDetailScreen() {
  const user = useSelector((state: AppStateType) => state.user);
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {plo, evaluated, achieved}: any = route.params;

  useMemo(() => {
    navigation.setOptions({headerTitle: `PLO${plo.number} Evaluation`});
  }, []);

  return (
    <FetchingFlatList<any>
      fetchMethod={() => userService.getResultDetail(user.userData!.id, plo.id)}
      ListHeaderComponent={
        <Card style={{margin: 8, overflow: 'hidden'}}>
          <Caption style={{alignSelf: 'center', marginTop: 8}}>
            {achieved}%/{evaluated}%
          </Caption>
          <ProgressBar
            progress={evaluated / 100}
            style={{
              height: 8,
            }}
            color={colors.primaryLight}
          />
          <ProgressBar
            progress={achieved / 100}
            color={colors.greenLight}
            style={{
              backgroundColor: '#0000',
              position: 'absolute',
              bottom: 0,
              height: 8,
            }}
          />
        </Card>
      }
      renderItem={({item}) => (
        <Card style={{margin: 8, overflow: 'hidden'}}>
          <View
            style={{
              flexDirection: 'row',
              margin: 16,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Title>{item.activity.title}</Title>
            <Caption style={{fontWeight: 'bold'}}>
              {item.obtained}/{item.activity.marks}
            </Caption>
          </View>
          <Divider />
          <List.Accordion
            style={{backgroundColor: AppTheme.colors.surface}}
            title="CLOs">
            {item.clos.map((c: CLOType) => (
              <List.Item title={c.title} description={c.description} />
            ))}
          </List.Accordion>
        </Card>
      )}
    />
  );
}
