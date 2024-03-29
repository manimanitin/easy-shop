import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProductContainer from '../Screens/Products/ProductContainer';
import SingleProduct from '../Screens/Products/SingleProduct';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={ProductContainer} />

      <Stack.Screen name='Product details' component={SingleProduct} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}

export default function HomeNavigator() {
  return <MyStack />;
}
