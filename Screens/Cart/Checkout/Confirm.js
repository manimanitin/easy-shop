import React from 'react';
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

var { height } = Dimensions.get('window');

const Confirm = (props) => {
  const confirmOrder = () => {
    setTimeout(() => {
      props.clearCart();
      props.navigation.navigate('Cart');
    });
  };

  const confirm = props.route.params;
  return (
    <ScrollView contentContainerStyle={style.container}>
      <View style={style.title}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Confirm Order</Text>
        {props.route.params ? (
          <View style={{ borderWidth: 1, borderColor: 'orange' }}>
            <Text style={style.shipping}>Shipping to:</Text>
            <View style={{ padding: 8 }}>
              <Text>Address: {confirm.order.order.shippingAddress1}</Text>
              <Text>Address2: {confirm.order.order.shippingAddress2}</Text>
              <Text>City: {confirm.order.order.city}</Text>
              <Text>Zip Code: {confirm.order.order.zip}</Text>
              <Text>Country: {confirm.order.order.country}</Text>
            </View>
            <Text style={style.title}>
              Items: {JSON.stringify(confirm.order.order.orderItems)}
            </Text>
            <FlatList
              data={confirm.order.order.orderItems}
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
