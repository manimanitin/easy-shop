import React, { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, View, Box, HStack, VStack, Spacer, Avatar } from 'native-base';

const CartItem = (props) => {
  const item = props.item.item;
  const [quantity, setQuantity] = useState(props.quantity);
  // return <Text>{JSON.stringify(props.item)}</Text>;
  return (
    // <View>
    //   <FlatList
    //     data={data}
    //     renderItem={({ item }) => (
    <View backgroundColor={'white'}>
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
              uri: item.product.image
                ? item.product.image
                : 'https://img.uline.com/is/image/uline/S-4163?$Mobile_Zoom$',
            }}
          />
          <VStack>
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
            <Text
              color='coolGray.600'
              _dark={{
                color: 'warmGray.200',
              }}
            >
              {item.product.description}
            </Text>
          </VStack>
          <Spacer />
          <Text>${item.product.price}</Text>
        </HStack>
      </Box>
    </View>
  );
};

export default CartItem;
