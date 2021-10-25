import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {StatusBar} from 'react-native';
import {Provider} from 'react-native-paper';
import {routes} from './app.routes';
import store from '@app/store';
import {DefaultNavTheme, DefaultTheme} from '@app/styles';
import Toast from 'react-native-toast-message';

const {Navigator, Screen} = createStackNavigator();
const App = () => {
  return (
    <>
      <ReduxProvider store={store}>
        <Provider theme={DefaultTheme}>
          <NavigationContainer theme={DefaultNavTheme}>
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
      <Toast ref={ref => Toast.setRef(ref)} position="bottom" />
    </>
  );
};

export default App;
