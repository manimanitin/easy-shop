import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import ProductContainer from './Screens/Products/ProductContainer';
import Header from './Shared/Header';
export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Header />
        <ProductContainer />
      </View>
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
