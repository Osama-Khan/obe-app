import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo, useState} from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {StatusBar} from 'react-native';
import {Provider} from 'react-native-paper';
import {routes} from './app.routes';
import store from '@app/store';
import {NavTheme, AppTheme, colors} from '@app/styles';
import Toast from 'react-native-toast-message';

const {Navigator, Screen} = createStackNavigator();
const App = () => {
  const [stack, setStack] = useState(routes.auth);
  useMemo(() => {
    store.subscribe(() => {
      const user = store.getState().user;
      if (!user.userData) {
        if (stack !== routes.auth) setStack(routes.auth);
        return;
      }
      const role = user.userData.role?.name;
      if (role === 'admin' && stack !== routes.admin) {
        setStack(routes.admin);
      }
    });
  }, []);
  return (
    <>
      <ReduxProvider store={store}>
        <Provider theme={AppTheme}>
          <NavigationContainer theme={NavTheme}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <Navigator>
              {stack.map(r => (
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
