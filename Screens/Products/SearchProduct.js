import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
} from 'native-base';

let { width } = Dimensions.get('window');

const SearchProduct = (props) => {
  const { filterProducts } = props;
  return (
    <View style={{ width: width }}>
      {filterProducts.length > 0 ? (
        <Box
          w={{
            base: '100%',
            md: '25%',
          }}
        >
          <FlatList
            data={filterProducts}
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
                      uri: item.image,
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
                      {item.name}
                    </Text>
                    <Text
                      color='coolGray.600'
                      _dark={{
                        color: 'warmGray.200',
                      }}
                    >
                      {item.description}
                    </Text>
                  </VStack>
                  <Spacer />
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: 'center' }}>
            There are no such products
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SearchProduct;
