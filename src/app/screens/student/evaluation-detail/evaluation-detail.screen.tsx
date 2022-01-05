import {FetchingFlatList} from '@app/components/listing';
import userService from '@app/services/user.service';
import {AppStateType} from '@app/store/state';
import {AppTheme, colors} from '@app/styles';
import {CLOType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {
  Card,
  Title,
  Caption,
  List,
  Text,
  Divider,
  ProgressBar,
} from 'react-native-paper';
import {useSelector} from 'react-redux';

export default function EvaluationDetailScreen() {
  const user = useSelector((state: AppStateType) => state.user);
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {plo, evaluated, achieved}: any = route.params;

  return (
    <>
      <View
        style={{
          backgroundColor: colors.primary,
          padding: 16,
          paddingBottom: 32,
        }}>
        <Title
          style={{
            fontWeight: 'bold',
            color: '#fff',
          }}>
          PLO{plo.number} Evaluation
        </Title>
        <Caption style={{color: '#ddd'}}>
          Details of your evaluation of PLO {plo.number} are as follows
        </Caption>
        <Card
          style={{
            overflow: 'hidden',
            position: 'absolute',
            marginLeft: 16,
            bottom: -16,
            width: '100%',
          }}>
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
      </View>
      <View style={{height: 16}} />
      <FetchingFlatList<any>
        fetchMethod={() =>
          userService.getResultDetail(user.userData!.id, plo.id)
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
    </>
  );
}
