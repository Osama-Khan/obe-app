import React from 'react';
import {StatusBar, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';

export default function SplashScreen() {
  return (
    <View>
      <StatusBar hidden />
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <ActivityIndicator size="large" />
        <Text style={{marginTop: 16}}>{'  '}Logging you in...</Text>
      </View>
    </View>
  );
}
