import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo, useState} from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {StatusBar, View} from 'react-native';
import {ActivityIndicator, Provider} from 'react-native-paper';
import {routes} from './app.routes';
import store from '@app/store';
import {NavTheme, AppTheme, colors} from '@app/styles';
import Toast from 'react-native-toast-message';
import uiService from '@app/services/ui.service';
import {initializeInterceptors} from '@app/interceptors';
import authService from '@app/services/auth.service';
import {userActions} from '@app/store/actions';
import storageService from '@app/services/storage.service';

const {Navigator, Screen} = createStackNavigator();
initializeInterceptors();

const App = () => {
  const [stack, setStack] = useState(routes.auth);
  const [restoring, setRestoring] = useState(true);
  useMemo(() => {
    store.subscribe(() => {
      const user = store.getState().user;
      if (!user.userData) {
        setStack(routes.auth);
        return;
      }
      const role = user.userData.role?.name;
      if (role === 'admin') {
        setStack(routes.admin);
        return;
      }
      if (role === 'hod') {
        setStack(routes.hod);
        return;
      }
      if (role === 'teacher') {
        setStack(routes.teacher);
        return;
      }
      if (role === 'student') {
        setStack(routes.student);
        return;
      }
      uiService.toastError('Error: Could not find navigation for user type!');
    });
    authService
      .loginWithToken()
      .catch(e => {
        if (e.response) {
          uiService.toastError('Login expired!');
          storageService.clearToken();
          return;
        }
        uiService.toastError('Could not connect to server!');
      })
      .finally(() => {
        setRestoring(false);
      });
  }, []);
  return restoring ? (
    <View>
      <StatusBar hidden />
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  ) : (
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
