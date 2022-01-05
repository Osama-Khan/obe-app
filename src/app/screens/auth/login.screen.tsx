import React, {useState} from 'react';
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
import {colors} from '@app/styles';

export const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView>
      <Card
        elevation={8}
        style={{
          alignSelf: 'center',
          width: 132,
          margin: 8,
          height: 132,
          borderRadius: 32,
          borderWidth: 2,
          borderColor: colors.primary,
        }}>
        <Image
          source={require('@assets/logo.png')}
          style={{width: 128, height: 128}}
          resizeMode="contain"
        />
      </Card>
      <Card
        style={{
          margin: 8,
          padding: 8,
          overflow: 'hidden',
          borderTopWidth: 2,
          borderColor: colors.primary,
        }}>
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
        <Button
          icon="login"
          mode="contained"
          disabled={!username || !password || loading}
          loading={loading}
          style={{margin: -8, marginTop: 8, borderRadius: 0}}
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
