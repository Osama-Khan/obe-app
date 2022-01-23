import {colors} from '@app/styles';
import React from 'react';
import {Image, StatusBar, View} from 'react-native';
import {ActivityIndicator, Card} from 'react-native-paper';

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
        <Card style={imgStyle} elevation={8}>
          <Image source={require('@assets/logo.png')} style={imgStyle} />
        </Card>
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{marginTop: 48}}
        />
      </View>
    </View>
  );
}

const imgStyle = {width: 144, height: 144};
