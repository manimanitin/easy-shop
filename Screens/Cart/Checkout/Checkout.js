import React from 'react';
import { Text, View, Button } from 'react-native';
import { Select } from 'native-base';
import FormContainer from '../../../Shared/Form/FormContainer';
import Input from '../../../Shared/Form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { useEffect, useState, useContext } from 'react';
import AuthGlobal from '../../../Context/store/AuthGlobal';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
const countries = require('../../../assets/data/countries.json');

const Checkout = (props) => {
  const context = useContext(AuthGlobal);

  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);
    if (context.stateUser.isAuthenticated) {
      setUser(context.stateUser.user.userId);
    } else {
      props.navigation.navigate('Cart');
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Please login to checkout',
        text2: ''
      });
    }
    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    console.log(user);
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: '3',
      user,
      zip,
    };
    console.log(props.cartItems);
    props.navigation.navigate('Payment', { order: order });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={'Shipping address'}>
        <Input
          placeholder={'Phone'}
          name={'phone'}
          value={phone}
          keyboardType={'numeric'}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={'Shipping Address 1'}
          name={'ShippingAddress1'}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={'Shipping Address 2'}
          name={'ShippingAddress2'}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={'City'}
          name={'city'}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={'Zip Code'}
          name={'zip'}
          value={zip}
          keyboardType={'numeric'}
          onChangeText={(text) => setZip(text)}
        />
        <Select
          selectedValue={country}
          placeholder='Select your country'
          placeholderTextColor={'blue.300'}
          onValueChange={(e) => setCountry(e)}
        >
          {countries.map((c) => {
            return <Select.Item key={c.code} label={c.name} value={c.name} />;
          })}
        </Select>
        <View style={{ width: '80%', alignItems: 'center' }}>
          <Button title='Confirm' onPress={() => checkOut()} />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};


export default connect(mapStateToProps)(Checkout);