import userService from '@app/services/user.service';
import {NavigationProp, StackActions} from '@react-navigation/core';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Switch, View} from 'react-native';
import {
  Caption,
  Card,
  Divider,
  Title,
  TextInput,
  Button,
  Text,
} from 'react-native-paper';
import {homeRoute} from 'src/app.routes';
import userActions from '@app/store/actions/user.actions';
import uiService from '@app/services/ui.service';

type P = {navigation: NavigationProp<any>};

export const LoginScreen = ({navigation}: P) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  return (
    <View style={{justifyContent: 'center', flexGrow: 1}}>
      <Card style={{margin: 8, padding: 8}}>
        <Title style={{fontWeight: 'bold'}}>Login</Title>
        <Caption>Enter your details</Caption>
        <Divider style={{marginVertical: 4}} />
        <TextInput
          mode="outlined"
          label="Username"
          onChangeText={setUsername}
        />
        <TextInput
          mode="outlined"
          label="Password"
          onChangeText={setPassword}
          secureTextEntry
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text>Remember me</Text>
          <Switch value={remember} onValueChange={setRemember} />
        </View>
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
              .login({username, password, remember})
              .then((res: any) => {
                const {token, ...userData} = res.data;
                dispatch(
                  userActions.setUser({token, userData, restoringState: false}),
                );
                navigation.dispatch(StackActions.replace(homeRoute.name));
              })
              .catch(e => {
                if (e.response.status === 400) {
                  uiService.toastError('Invalid username or password!');
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
