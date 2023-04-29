import React, { useContext } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Container,
  FlatList,
  Avatar,
  Image,
  Box,
  HStack,
  VStack,
  Spacer,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

import { SwipeListView } from 'react-native-swipe-list-view';

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartAction';
import CartItem from './CartItem';
import AuthGlobal from '../../Context/store/AuthGlobal';

import { ScrollView } from 'react-native';


const { height, width } = Dimensions.get('window');

const Cart = (props) => {

  const context = useContext(AuthGlobal);
  var total = 0;

  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });
  return (
    <>
      <ScrollView>
        <View style={{ width: width }}>
          <VStack>
            {props.cartItems.length > 0 ? (
              <View>
                <Box
                  w={{
                    base: '100%',
                    md: '25%',
                  }}
                >
                  <SwipeListView
                    recalculateHiddenLayout={true}
                    useFlatList={true}
                    data={props.cartItems}
                    keyExtractor={(data) => data.product ? data.product._id.toString() : null}
                    renderItem={(data) => <CartItem item={data} />}
                    renderHiddenItem={(data) => (
                      <View style={styles.hiddenContainer}>
                        <TouchableOpacity
                          onPress={() => props.removeFromCart(data.item)}
                          style={styles.hiddenButton}
                        >
                          <Icon name='trash' color={'white'} size={30} />
                        </TouchableOpacity>
                      </View>
                    )}
                    disableRightSwipe={true}
                    previewOpenDelay={3000}
                    friction={1000}
                    tension={40}
                    leftOpenValue={75}
                    stopLeftSwipe={75}
                    rightOpenValue={-75}
                  />
                </Box>
                <Spacer />
                <HStack>
                  <Text>${total}</Text>
                  <Spacer />
                  <EasyButton danger medium onPress={() => props.clearCart()} >
                    <Text style={{ color: 'white' }}>Clear</Text>
                  </EasyButton>
                  <Spacer />
                  {context.stateUser.isAuthenticated ? (
                    <EasyButton
                      primary
                      medium
                      onPress={() => {
                        props.navigation.navigate('Checkout');
                      }} >
                      <Text style={{ color: 'white' }}>Checkout</Text>
                    </EasyButton>
                  ) : (
                    <EasyButton
                      secondary
                      medium
                      onPress={() => {
                        props.navigation.navigate('Login');
                      }} >
                      <Text style={{ color: 'white' }}>Login</Text>
                    </EasyButton>
                  )}

                </HStack>
              </View>
            ) : (
              <View style={styles.center}>
                <Text style={{ alignSelf: 'center' }}>No comprados </Text>
              </View>
            )}
          </VStack>
        </View>
      </ScrollView>
    </>
  );

};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  emptyContainer: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red',
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
