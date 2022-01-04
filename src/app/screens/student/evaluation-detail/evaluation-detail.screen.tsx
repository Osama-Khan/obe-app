import {FetchingFlatList} from '@app/components/listing';
import userService from '@app/services/user.service';
import {AppStateType} from '@app/store/state';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {Card, Title, Caption} from 'react-native-paper';
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
        <Card style={{margin: 8, padding: 8}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Title>{item.activity.title}</Title>
            <Caption style={{fontWeight: 'bold'}}>
              {item.obtained}/{item.activity.marks}
            </Caption>
          </View>
        </Card>
      )}
    />
  );
}
