import userService from '@app/services/user.service';
import UserType from '@app/types/user.type';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Caption, Card, Text, Title} from 'react-native-paper';

export const ViewUserScreen = () => {
  const [data, setData] = useState<UserType[]>();
  useEffect(() => {
    userService
      .get()
      .then(res => {
        setData(res.data);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);
  return (
    <FlatList
      data={data}
      renderItem={info => (
        <Card style={{margin: 4, padding: 4}} key={info.index}>
          <Text>{info.item.username}</Text>
          <Caption>{info.item.email}</Caption>
        </Card>
      )}
    />
  );
};
