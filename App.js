import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

import Header from './Shared/Header';
import Main from './Navigators/Main';

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer >
        <Header />
        <Main />
      </NavigationContainer>
    </NativeBaseProvider>
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
