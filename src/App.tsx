import React from 'react';
import {StatusBar, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {homeRoute, routes} from './app.routes';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={{backgroundColor: '#eee', height: '100%'}}>
      <StatusBar backgroundColor="#50d" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={homeRoute.name}>
          {routes.stackNav.map(r => (
            <Stack.Screen component={r.component} name={r.name} key={r.id} />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
