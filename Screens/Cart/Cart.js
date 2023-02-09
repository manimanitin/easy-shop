import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Button,
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

import icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import * as actions from '../../Redux/Actions/cartAction';
const { height, width } = Dimensions.get('window');

const Cart = (props) => {
  return (
    <>
      {props.cartItems.length ? (
        <FlatList
          data={props.cartItems}
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
              <HStack
                display={'flex'}
                flexDirection={'row'}
                justifyContent='space-between'
              >
                <Avatar
                  size='48px'
                  source={{
                    uri: item.product.image
                      ? item.product.image
                      : 'https://img.uline.com/is/image/uline/S-4163?$Mobile_Zoom$',
                  }}
                />
                <HStack>
                  <Text
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color='coolGray.800'
                    bold
                    onPress={() => {
                      props.navigation.navigate('Product details', {
                        item: item,
                      });
                    }}
                  >
                    {item.product.name}
                  </Text>
                  <Spacer />
                  <Text
                    alignSelf={'flex-end'}
                    color='coolGray.600'
                    _dark={{
                      color: 'warmGray.200',
                    }}
                  >
                    {item.product.price}
                  </Text>
                </HStack>
                <Spacer />
              </HStack>
            </Box>
          )}
          key={Math.random()}
        />
      ) : (
        <Container style={styles.empty}>
          <Text> No itemerinos , add now</Text>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
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
});

export default connect(mapStateToProps, null)(Cart);
