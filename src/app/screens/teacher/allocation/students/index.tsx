import {ManyCriteria} from '@app/models/criteria';
import sectionService from '@app/services/section.service';
import uiService from '@app/services/ui.service';
import {SectionType, UserType} from '@app/types';
import {useRoute} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {
  ActivityIndicator,
  Caption,
  Card,
  Searchbar,
  Title,
} from 'react-native-paper';

export default function StudentsScreen() {
  const [users, setUsers] = useState<UserType[]>();
  const [q, setQ] = useState('');
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
          This section has no students!
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
          </View>
        </Card>
      )}
    />
  ) : (
    <ActivityIndicator style={{margin: 16, alignSelf: 'center'}} />
  );
}
