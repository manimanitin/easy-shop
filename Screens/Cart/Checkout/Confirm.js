import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  Box,
  HStack,
  VStack,
  Spacer,
  Avatar,
  ScrollView,
  FlatList,
  Button,
} from 'native-base';
import { connect, Connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/cartAction';
import { Dimensions } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Toast } from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';
import baseURL from '../../../assets/common/baseURL';


var { height } = Dimensions.get('window');

const Confirm = (props) => {


  const finalOrder = props.route.params;
  const [token, setToken] = useState();
  const postOrders = async (order, config) => {
    await axios.post(`${baseURL}orders`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Order completed successfully',
            text2: ""
          });
        }
        setTimeout(() => {
          props.clearCart();
          props.navigation.navigate('Cart');
        });
      })
      .catch((err) => {
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'something went wrong',
          text2: "Try again later"
        });
      });
  };

  const confirmOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const order = finalOrder.order.order;
    postOrders(order, config);
  };

  useEffect(() => {
    AsyncStorage.getItem('jwt').then((res) => {
      setToken(res);
    }).catch((error) => console.log(error));
    return () => {

    };
  }, []);

  const confirm = props.route.params;
  return (
    <ScrollView contentContainerStyle={style.container}>
      <View style={style.title}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Confirm Order</Text>
        {props.route.params ? (
          <View style={{ borderWidth: 1, borderColor: 'orange' }}>
            <Text style={style.shipping}>Shipping to:</Text>
            <View style={{ padding: 8 }}>
              <Text>Address: {finalOrder.order.order.shippingAddress1}</Text>
              <Text>Address2: {finalOrder.order.order.shippingAddress2}</Text>
              <Text>City: {finalOrder.order.order.city}</Text>
              <Text>Zip Code: {finalOrder.order.order.zip}</Text>
              <Text>Country: {finalOrder.order.order.country}</Text>
            </View>
            <Text style={style.title}>
            </Text>
            <FlatList
              data={finalOrder.order.order.orderItems}
              renderItem={({ item }) => (
                <Box
                  borderBottomWidth='1'
                  _dark={{
                    borderColor: 'gray.600',
                  }}
                  borderColor='coolGray.200'
                  pl='4'
                  pr='5'
                  py='2'
                >
                  <HStack space={3} justifyContent='space-between'>
                    <Avatar
                      size='48px'
                      source={{
                        uri: item.product.image,
                      }}
                    />
                    <VStack>
                      <Text
                        _dark={{
                          color: 'warmGray.50',
                        }}
                        color='coolGray.800'
                        bold
                      >
                        {item.product.name}
                      </Text>
                      <Text
                        color='coolGray.600'
                        _dark={{
                          color: 'warmGray.200',
                        }}
                      >
                        {item.product.price}
                      </Text>
                    </VStack>
                    <Spacer />
                  </HStack>
                </Box>
              )}
              keyExtractor={(item) => item.product._id.$oid}
            />
          </View>
        ) : null}
      </View>
      <View style={{ alignItems: 'center', margin: 20 }}>
        <Button onPress={confirmOrder}>Place Order</Button>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => {
      dispatch(actions.clearCart());
    },
  };
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

export default connect(null, mapDispatchToProps)(Confirm);
