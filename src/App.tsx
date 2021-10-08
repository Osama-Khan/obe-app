import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {routes} from './app.routes';

const {Navigator, Screen} = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#50d" />
      <Navigator>
        {routes.stackNav.map(r => (
          <Screen
            component={r.component}
            name={r.name}
            key={r.id}
            options={r.options}
          />
        ))}
      </Navigator>
    </NavigationContainer>
  );
};

export default App;
