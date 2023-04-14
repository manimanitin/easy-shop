import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';





import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/input';
import Error from '../../Shared/Error';

import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser } from '../../context/actions/Auth.actions';





const Login = (props) => {

  const context = useContext(AuthGlobal);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate('User Profile');
    }


  }, [context.stateUser.isAuthenticated]);


  const handleSubmit = () => {
    const user = {
      email,
      password,
    };
    if (email === "" || password === "") {
      setError('please fill in your credentials');
    } else {
      loginUser(user, context.dispatch);
      console.log('Success');
    }
  };

  return (
    <FormContainer>
      <Input
        placeholder={'Enter email'}
        name={'email'}
        id={'email'}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder={'Enter password'}
        name={'password'}
        id={'password'}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={style.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <Button title='Login' onPress={() => handleSubmit()} />
      </View>
      <View style={[{ marginTop: 40 }, style.buttonGroup]}>
        <Text style={style.middleText}>I don't have an account</Text>
        <Button
          title='Register'
          onPress={() => props.navigation.navigate('Register')}
        />
      </View>
    </FormContainer>
  );
};

const style = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
  },
  middleText: {
    marginBottom: '20',
    alignSelf: 'center'
  }
});
export default Login;
