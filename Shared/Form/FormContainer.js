import React from 'react';
import { ScrollView, Dimensions, StyleSheet, Text } from 'react-native';

var { width } = Dimensions.get('window');
const FormContainer = () => {
  return (
    <ScrollView style={style.container}>
      <Text style={style.container}>{props.title}</Text>
      {props.children}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 400,
    width: width,
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 30,
  },
});

export default FormContainer;
