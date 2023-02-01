import React, { useState } from 'react';

import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  Dimensions,
} from 'react-native';

import {
  InputLeftAddon,
  InputRightAddon,
  Container,
  HStack,
  VStack,
  Box,
} from 'native-base';

const win = Dimensions.get('window');
const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState('');
  return (
    <Container style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            style={styles.image}
            resizeMode='contain'
            source={{
              uri: item.image
                ? item.image
                : 'https://img.uline.com/is/image/uline/S-4163?$Mobile_Zoom$',
            }}
          />
        </View>
        <View>
          <VStack>
            <Text style={styles.contentHeader}>{item.name} </Text>
          </VStack>
          <VStack>
            <Text style={styles.contentText}>{item.brand} </Text>
          </VStack>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <HStack display={'flex'} flexDirection='row' justifyContent={'space-between'}>
          <Text style={styles.price}>${item.price}</Text>
          <InputRightAddon>
            <Button title='Add' />
          </InputRightAddon>
        </HStack>
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
  },
  image: {
    width: win.width,
    height: 250,
  },
  contentHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
  price: {
    fontSize: 20,
    margin: 20,
    color: 'red',
  },
});

export default SingleProduct;
