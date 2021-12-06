import {colors} from '@app/styles';
import {ActivityType} from '@app/types';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Caption, Card, List, Text, Title} from 'react-native-paper';

export default function ActivityCard({activity}: {activity: ActivityType}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card
      style={{
        margin: 16,
        marginVertical: 8,
        overflow: 'hidden',
      }}>
      <View style={{padding: 16}}>
        <Caption
          style={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: colors.primary,
          }}>
          {activity.type!.name}
        </Caption>
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
