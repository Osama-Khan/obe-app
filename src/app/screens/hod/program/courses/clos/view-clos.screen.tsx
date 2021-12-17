import {IconMessageView} from '@app/components/icon-message-view';
import {ManyCriteria} from '@app/models/criteria';
import {addCloRoute} from '@app/routes/hod.routes';
import cloService from '@app/services/clo.service';
import uiService from '@app/services/ui.service';
import {colors} from '@app/styles';
import {CLOType, CourseType, ProgramType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {FlatList, useWindowDimensions, View} from 'react-native';
import {
  ActivityIndicator,
  Caption,
  Card,
  Divider,
  FAB,
  IconButton,
  List,
  Text,
  Title,
} from 'react-native-paper';

export default function ViewClosScreen() {
  const [clos, setClos] = useState<CLOType[]>();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const course: CourseType = route.params!.course;
  const program: ProgramType = route.params!.program;
  const height = useWindowDimensions().height - 92;

  useMemo(() => {
    const criteria = new ManyCriteria<CLOType>();
    criteria.addRelation('maps');
    criteria.addCondition('course', course.id);
    navigation.setOptions({headerTitle: course.title + ' CLOs'});
    cloService
      .get(criteria)
      .then(res => setClos(sortClos(res.data)))
      .catch(() => uiService.toastError('Failed to fetch CLOs'));
  }, []);

  const gotoAdd = () => {
    if (!clos) return;
    navigation.navigate(addCloRoute.name, {
      course,
      program,
      clos,
      onAdd: (clo: CLOType) => {
        setClos(sortClos([...clos, clo]));
      },
    });
  };

  return clos ? (
    <>
      <FlatList
        data={clos}
        renderItem={({item}) => (
          <Card
            style={{
              borderTopWidth: 2,
              borderColor: colors.primary,
              margin: 16,
              marginVertical: 8,
              overflow: 'hidden',
            }}>
            <View style={{padding: 8}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Title>CLO {item.number}</Title>
                <IconButton
                  style={{marginLeft: 'auto'}}
                  color={colors.red}
                  icon="link-off"
                  onPress={() => {}}
                />
              </View>
              <Caption>
                {item.title}: {item.description}
              </Caption>
            </View>
            <Divider />
            <List.Accordion
              title="Mapped PLOs"
              style={{backgroundColor: 'white'}}>
              {item.maps!.map(m => (
                <List.Item
                  title={m.plo!.title}
                  right={() => (
                    <Text
                      style={{textAlignVertical: 'center', fontWeight: 'bold'}}>
                      {m.weight}%
                    </Text>
                  )}
                />
              ))}
            </List.Accordion>
          </Card>
        )}
        ListEmptyComponent={
          <View style={{height, justifyContent: 'center'}}>
            <IconMessageView
              icon="graph"
              caption="This course has no CLOs. Start by adding one."
              title="No CLOs"
              btnProps={{
                icon: 'plus',
                text: 'Add CLO',
                action: gotoAdd,
              }}
            />
          </View>
        }
      />
      <FAB
        icon="plus"
        style={{position: 'absolute', bottom: 16, right: 16}}
        onPress={gotoAdd}
      />
    </>
  ) : (
    <ActivityIndicator style={{flexGrow: 1, alignSelf: 'center'}} />
  );
}

const sortClos = (clos: CLOType[]) => clos.sort((a, b) => a.number - b.number);
