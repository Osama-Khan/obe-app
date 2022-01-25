import {FetchingFlatList} from '@app/components/listing';
import userService from '@app/services/user.service';
import store from '@app/store';
import {AppTheme, colors} from '@app/styles';
import {CLOType} from '@app/types';
import {useRoute} from '@react-navigation/native';
import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import {
  Card,
  Title,
  Caption,
  List,
  Divider,
  ProgressBar,
} from 'react-native-paper';

export default function EvaluationDetailScreen() {
  const route = useRoute();
  const width = useWindowDimensions().width;
  const {plo, evaluated, achieved, userId}: any = route.params;
  const isSelf = store.getState().user.userData?.id === userId;

  return (
    <>
      <View
        style={{
          backgroundColor: colors.primary,
          paddingBottom: 32,
        }}>
        <Title
          style={{
            fontWeight: 'bold',
            color: '#fff',
            marginLeft: 16,
          }}>
          PLO{plo.number} Evaluation
        </Title>
        <Caption style={{color: '#ddd', marginLeft: 16}}>
          Details of {isSelf ? 'your ' : ''}evaluation of PLO {plo.number}{' '}
          {isSelf ? '' : `for ${userId} `}are as follows
        </Caption>
        <Card
          style={{
            overflow: 'hidden',
            marginHorizontal: 16,
            position: 'absolute',
            width: width - 32,
            bottom: -16,
          }}>
          <Caption style={{alignSelf: 'center', marginTop: 8}}>
            {achieved.toFixed(2)}%/{evaluated.toFixed(2)}%
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
        fetchMethod={() => userService.getResultDetail(userId, plo.id)}
        renderItem={({item}) => (
          <Card style={{margin: 8, overflow: 'hidden'}}>
            <View
              style={{
                flexDirection: 'row',
                margin: 16,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Title>{item.activity.title}</Title>
                <Caption>{item.course.title}</Caption>
              </View>
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
