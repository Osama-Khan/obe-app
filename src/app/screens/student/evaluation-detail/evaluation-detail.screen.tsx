import {FetchingFlatList} from '@app/components/listing';
import userService from '@app/services/user.service';
import {AppStateType} from '@app/store/state';
import {AppTheme} from '@app/styles';
import {CLOType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {Card, Title, Caption, List, Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';

export default function EvaluationDetailScreen() {
  const user = useSelector((state: AppStateType) => state.user);
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {plo}: any = route.params;

  useMemo(() => {
    navigation.setOptions({headerTitle: `PLO${plo.number} Evaluation`});
  }, []);

  return (
    <FetchingFlatList<any>
      fetchMethod={() => userService.getResultDetail(user.userData!.id, plo.id)}
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
