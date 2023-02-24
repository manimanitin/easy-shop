import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  Text,
  View,
  Box,
  HStack,
  VStack,
  Spacer,
  Avatar,
  ScrollView,
} from 'native-base';
import { Connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/cartAction';
import { Dimensions } from 'react-native';

var { height } = Dimensions.get('window');

const Confirm = (props) => {
  const Confirm = props.route.params;
  return (
    <ScrollView contentContainerStyle={style.container}>
      <View style={style.title}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Confirm Order</Text>
        {props.route.params ? (
          <View style={{ borderWidth: 1, borderColor: 'orange' }}>
            <Text style={style.shipping}>Shipping to:</Text>
            <View style={{ padding: 8 }}>
              <Text>Address:{confirm.order.order.shippingAddress1}</Text>
              <Text>Address2:{confirm.order.order.shippingAddress2}</Text>
              <Text>City:{confirm.order.order.city}</Text>
              <Text>Zip Code:{confirm.order.order.zip}</Text>
              <Text>Country:{confirm.order.order.country}</Text>
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  shipping: {
    alignSelf: 'center',
    margin: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Confirm;
