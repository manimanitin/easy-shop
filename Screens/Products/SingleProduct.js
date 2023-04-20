import React, { useState,useEffect} from 'react';
import * as actions from '../../Redux/Actions/cartAction';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  Dimensions,
} from 'react-native';

import EasyButton from '../../Shared/StyledComponents/EasyButton';
import TrafficLight from '../../Shared/StyledComponents/TrafficLight';

import {
  InputLeftAddon,
  InputRightAddon,
  Container,
  HStack,
  VStack,
  Box,
} from 'native-base';

import { connect } from 'react-redux';

const win = Dimensions.get('window');
const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState("");

  useEffect(() => {
    if (props.route.params.item.countInStock == 0) {
      setAvailability(<TrafficLight unavailable></TrafficLight>);
      setAvailabilityText("unavailable");
    } else if (props.route.params.item.countInStock <= 5) {
      setAvailability(<TrafficLight limited></TrafficLight>);
      setAvailabilityText("Limited Stock");
    } else {
      setAvailability(<TrafficLight available></TrafficLight>);
      setAvailabilityText("Available");
    }
    return () => {
      setAvailability(null);
      setAvailabilityText("");
    };
  }, []);

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
        <View style={styles.availabilityCounter}>
          <View style={styles.availability}>
            <Text style={{ marginRight: 10 }}>
              Availability: {availabilityText}
            </Text>
            {availability}
          </View>
          <Text>{item.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <HStack
          display={'flex'}
          flexDirection='row'
          justifyContent={'space-between'}
        >
          <Text style={styles.price}>${item.price}</Text>
          <EasyButton
            primary
            medium
            onPress={() => {
              props.addItemToCart(item),
                Toast.show({
                  topOffset: 60,
                  type: 'success',
                  text1: `${item.name} added successfully`,
                  text2: 'go to your cart and complete your order'
                });
            }}
          >
            <Text style={{ color: 'white' }}>Add</Text>
          </EasyButton>
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
  availabilityCounter: {
    marginBottom: 20,
    alignItems: 'center'
  },
  availability: {
    flexDirection: 'row',
    marginBottom: 101,
  }
});
const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

export default connect(null, mapDispatchToProps)(SingleProduct);
