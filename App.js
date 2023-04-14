import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import store from './Redux/store';
import Header from './Shared/Header';
import Main from './Navigators/Main';


import Auth from './Context/store/Auth';

export default function App() {
  return (

    <Auth>
      <Provider store={store}>
        <NativeBaseProvider>
          <NavigationContainer>
            <Header />
            <Main />
            <Toast position='top' topOffset={20} />
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </Auth>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
