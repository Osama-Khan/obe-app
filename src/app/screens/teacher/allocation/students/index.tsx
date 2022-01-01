import {ManyCriteria} from '@app/models/criteria';
import {studentResultsRoute} from '@app/routes/shared.routes';
import sectionService from '@app/services/section.service';
import uiService from '@app/services/ui.service';
import {colors} from '@app/styles';
import {SectionType, UserType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {
  ActivityIndicator,
  Caption,
  Card,
  IconButton,
  Searchbar,
  Title,
} from 'react-native-paper';

export const StudentsScreen = () => {
  const [users, setUsers] = useState<UserType[]>();
  const [q, setQ] = useState('');
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const section = route.params!.allocation.section;
  useEffect(() => {
    const crit = new ManyCriteria<SectionType>();
    crit.addRelation('users');
    sectionService
      .getOne(section.id, crit)
      .then(r => {
        setUsers(r.data.users);
      })
      .catch(e => uiService.toastError('Could not fetch users!'));
  }, []);

  return users ? (
    <FlatList
      ListHeaderComponent={
        users.length > 0 ? (
          <Searchbar
            style={{margin: 16, marginVertical: 8}}
            placeholder="Search Students..."
            value={q}
            onChangeText={setQ}
          />
        ) : undefined
      }
      ListEmptyComponent={
        <Caption style={{marginVertical: 16, alignSelf: 'center'}}>
          {q
            ? 'No students found matching the search query!'
            : 'This section has no students!'}
        </Caption>
      }
      data={users.filter(u => {
        const lower = q.toLowerCase();
        return (
          u.id.toLowerCase().includes(lower) ||
          u.username.toLowerCase().includes(lower)
        );
      })}
      renderItem={({item}) => (
        <Card style={{margin: 16, padding: 16, marginVertical: 4}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Title>{item.username}</Title>
              <Caption>{item.id}</Caption>
            </View>
            <IconButton
              icon="table-check"
              style={{backgroundColor: colors.primarySubtle}}
              color={colors.primary}
              onPress={() => {
                navigation.navigate(studentResultsRoute.name, {user: item});
              }}
            />
          </View>
        </Card>
      )}
    />
  ) : (
    <ActivityIndicator style={{margin: 16, alignSelf: 'center'}} />
  );
};
