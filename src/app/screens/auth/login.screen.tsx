import userService from '@app/services/user.service';
import {NavigationProp} from '@react-navigation/core';
import React, {useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import {
  Caption,
  Card,
  Divider,
  Title,
  TextInput,
  Button,
} from 'react-native-paper';
import {homeRoute} from 'src/app.routes';

type P = {navigation: NavigationProp<any>};

export const LoginScreen = ({navigation}: P) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <View style={{justifyContent: 'center', flexGrow: 1}}>
      <Card style={{margin: 8, padding: 8}}>
        <Title style={{fontWeight: 'bold'}}>Login</Title>
        <Caption>Enter your details</Caption>
        <Divider style={{marginVertical: 4}} />
        <TextInput label="Username" onChangeText={setUsername} />
        <TextInput
          label="Password"
          onChangeText={setPassword}
          secureTextEntry
        />
        <Divider style={{marginVertical: 4}} />
        <Button
          icon="login"
          mode="contained"
          style={{marginLeft: 'auto'}}
          disabled={!username || !password || loading}
          loading={loading}
          onPress={() => {
            setLoading(true);
            userService
              .login({username, password})
              .then(res => {
                // TODO: Add res.data.token to store
                navigation.navigate(homeRoute.name);
              })
              .catch(e => {
                if (e.response.status === 400) {
                  ToastAndroid.show(
                    'Invalid username or password!',
                    ToastAndroid.SHORT,
                  );
                }
              })
              .finally(() => {
                setLoading(false);
              });
          }}>
          Login
        </Button>
      </Card>
    </View>
  );
};
