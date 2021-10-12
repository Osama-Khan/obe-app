import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {StatusBar} from 'react-native';
import {DefaultTheme, Provider} from 'react-native-paper';
import {routes} from './app.routes';
import store from '@app/store';

const {Navigator, Screen} = createStackNavigator();
const App = () => {
  return (
    <ReduxProvider store={store}>
      <Provider theme={DefaultTheme}>
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
      </Provider>
    </ReduxProvider>
  );
};

export default App;
