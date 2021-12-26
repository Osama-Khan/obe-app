import {evaluationRoute} from '@app/routes/teacher.routes';
import {colors} from '@app/styles';
import {ActivityType} from '@app/types';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Caption, Card, IconButton, List, Text, Title} from 'react-native-paper';

export default function ActivityCard({activity}: {activity: ActivityType}) {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation<any>();
  return (
    <Card
      style={{
        margin: 16,
        marginVertical: 8,
        overflow: 'hidden',
      }}>
      <View style={{padding: 16}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Caption
            style={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: colors.primary,
            }}>
            {activity.type!.name}
          </Caption>
          <IconButton
            icon="table-plus"
            style={{margin: 0}}
            onPress={() => {
              navigation.navigate(evaluationRoute.name, {activity});
            }}
          />
        </View>
        <Title>{activity.title}</Title>
        <Caption
          onPress={() => setExpanded(!expanded)}
          numberOfLines={expanded ? undefined : 1}>
          {activity.description}
        </Caption>
      </View>
      <List.Accordion title={'CLOs'} style={{backgroundColor: 'white'}}>
        {activity.maps
          .map(m => ({...m.clo, weight: m.weight}))
          .map(c => (
            <List.Item
              key={c.id}
              title={c.title}
              description={c.description}
              right={() => (
                <Text
                  style={{
                    fontWeight: 'bold',
                    textAlignVertical: 'center',
                  }}>
                  {c.weight}%
                </Text>
              )}
            />
          ))}
      </List.Accordion>
    </Card>
  );
}
