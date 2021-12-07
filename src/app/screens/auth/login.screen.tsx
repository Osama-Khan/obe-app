import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Image, ScrollView, Switch, View} from 'react-native';
import {
  Caption,
  Card,
  Divider,
  Title,
  TextInput,
  Button,
  Text,
} from 'react-native-paper';
import uiService from '@app/services/ui.service';
import authService from '@app/services/auth.service';

export const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image
        source={require('@assets/logo.png')}
        style={{alignSelf: 'center', width: '100%', margin: 8, height: 128}}
        resizeMode="contain"
      />
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
            authService
              .login({username, password, remember})
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
    </ScrollView>
  );
};
