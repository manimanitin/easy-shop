import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'native-base';

import HomeNavigator from './HomeNavigator';
import CartNavigator from './CartNavigator';
import CartIcon from '../Shared/CartIcon';
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator';
import AuthGlobal from '../Context/store/AuthGlobal';
const Tab = createBottomTabNavigator();
const Main = () => {

  const context = useContext(AuthGlobal);
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#e91e63',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name='home'
              style={{ position: 'relative' }}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Cart'
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name='shopping-cart' color={color} size={30} />
              <CartIcon />
            </View>
          ),
        }}
      />
      {context.stateUser.user.isAdmin === true ? (
        <Tab.Screen
          name='Admin'
          component={AdminNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name='cog' color={color} size={30} />
            ),
          }}
        />) : null}

      <Tab.Screen
        name='User'
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name='user' color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
