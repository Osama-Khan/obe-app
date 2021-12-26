import Icon from '@app/components/icon';
import {evaluationRoute} from '@app/routes/teacher.routes';
import {colors} from '@app/styles';
import {ActivityType} from '@app/types';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {
  Badge,
  Caption,
  Card,
  Chip,
  IconButton,
  List,
  Text,
  Title,
} from 'react-native-paper';

const EvaluationDoneBadge = () => (
  <View
    style={{
      backgroundColor: colors.primarySubtle,
      borderRadius: 0,
      borderBottomWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors.primary,
      width: '100%',
      padding: 4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
    <Text style={{color: colors.primary}}>Evaluated</Text>
    <Icon name="check" color={colors.primary} size={20} />
  </View>
);
export default function ActivityCard({activity}: {activity: ActivityType}) {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation<any>();
  const done = activity.evaluations && activity.evaluations.length > 0;
  return (
    <Card
      style={{
        margin: 16,
        marginVertical: 8,
        overflow: 'hidden',
        borderWidth: done ? 1 : 0,
        borderColor: done ? colors.primary : undefined,
      }}>
      {done && <EvaluationDoneBadge />}
      <View style={{padding: 8}}>
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
            icon={done ? 'table-edit' : 'table-plus'}
            style={{
              margin: 0,
              backgroundColor: done ? colors.primarySubtle : undefined,
            }}
            color={done ? colors.primary : undefined}
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
