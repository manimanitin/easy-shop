import React, { useState } from 'react';
import {
  View,
  Text,
  Container,
  VStack,
  HStack,
  FlatList,
  Radio,
  Spacer,
  Select,
} from 'native-base';
import { Button } from 'react-native';

const methods = [
  {
    name: 'Cash on delivery',
    value: '1',
  },
  {
    name: 'Bank Transfer',
    value: '2',
  },
  {
    name: 'Card Payment',
    value: '3',
  },
];

const paymentCards = [
  { name: 'Wallet', value: 1 },
  { name: 'Visa', value: 2 },
  { name: 'MasterCard', value: 3 },
  { name: 'Other', value: 4 },
];

const Payment = (props) => {
  const [Selected, setSelected] = useState();
  const [Card, setCard] = useState();
  const order = props.route.params;
  return (
    <Container>
      <VStack alignItems={'center'}>
        <View>
          <Text>Choose your payment method niakka</Text>
        </View>
        <Spacer />
        <View>
          <Radio.Group onChange={(nextValue) => setSelected(nextValue)}>
            <Radio value={methods[0].value}>{methods[0].name}</Radio>
            <Radio value={methods[1].value}>{methods[1].name}</Radio>
            <Radio value={methods[2].value}>{methods[2].name}</Radio>
          </Radio.Group>
        </View>
        <Spacer />
        {Selected == 3 ? (
          <Select
            selectedValue={Card}
            placeholder='Card payment'
            placeholderTextColor={'blue.300'}
            onValueChange={(e) => setCard(e)}
          >
            {paymentCards.map((c) => {
              return <Select.Item key={c.name} label={c.name} value={c.name} />;
            })}
          </Select>
        ) : null}
        <View style={{ marginTop: 60, alignSelf: 'center' }}>
          <Button
            title={'Confirm'}
            onPress={() => props.navigation.navigate('Confirm', { order })}
          />
        </View>
      </VStack>
    </Container>
  );
};

export default Payment;
