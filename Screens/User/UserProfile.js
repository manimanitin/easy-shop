import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.Actions';
import OrderCard from '../../Shared/OrderCard';


const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let tok;
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate('Login');
      } else {
        AsyncStorage.getItem('jwt').then((res) => {

          axios.get(`${baseURL}users/${context.stateUser.user.userId}`,
            {
              headers: { Authorization: `Bearer ${res}` }
            }).then((user) => {
              setUserProfile(user.data);
            }).catch((error) => {
              console.log(error);
            });
          axios.get(`${baseURL}orders`, {
            headers: { Authorization: `Bearer ${res}` }
          })
            .then((res) => {
              const data = res.data;
              console.log(data);
              const userOrders = data.filter(
                (order) => order.user._id === context.stateUser.user.userId
              );
              setOrders(userOrders);
              setLoading(false);
            })
            .catch((err) => { console.log(err); });
        });
      }


      return () => {
        setUserProfile();
        setOrders();
        setLoading(true);

      };

    }, [context.stateUser.isAuthenticated])
  );




  return (
    <ScrollView contentContainerStyle={styles.subContainer}>
      <Text style={{ fontSize: 30 }}>

        {userProfile ? userProfile.name : ""}
      </Text>
      <View style={{ marginTop: 20 }}>
        <Text style={{ margin: 10 }}>
          Email :{userProfile ? userProfile.email : ""}
        </Text>
        <Text style={{ margin: 10 }}>
          Phone :{userProfile ? userProfile.phone : ""}
        </Text>
      </View>
      <View style={{ marginTop: 80 }}>
        <Button title='Sign out' onPress={() => {
          AsyncStorage.removeItem('jwt');
          logoutUser(context.dispatch);
        }} />
      </View>
      <View style={styles.order}>
        <Text style={{ fontSize: 20 }}>
          My orders
        </Text>
        <View>
          {orders ? (
            orders.map((x) => {
              return <OrderCard key={x.id} {...x} />;
            })
          ) : (
            <View style={styles.order}>
              <Text>You have no orders</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60
  },
  order: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60
  }
});

export default UserProfile;
